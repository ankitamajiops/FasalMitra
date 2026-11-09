
/* ==================================
   FASALMITRA APPLICATION
================================== */

let crops = JSON.parse(localStorage.getItem("fasalmitraCrops")) || [];

function saveCrops() {
    localStorage.setItem("fasalmitraCrops", JSON.stringify(crops));
}

function updateDashboard() {
    const count = document.getElementById("cropCount");
    const quantity = document.getElementById("totalQuantity");
    const location = document.getElementById("farmerLocation");
    const cropList = document.getElementById("cropList");

    if (!count || !quantity || !cropList) return;

    count.textContent = crops.length;

    const total = crops.reduce(
        (sum, crop) => sum + Number(crop.quantity), 0
    );

    quantity.textContent = total.toFixed(1) + " Qt";

    if (crops.length > 0) {
        location.textContent = crops[crops.length - 1].location;
    } else {
        location.textContent = "Not added";
    }

    if (crops.length === 0) {
        cropList.innerHTML =
            '<p class="empty-message">No harvest records yet. Add your first crop above.</p>';
        return;
    }

    cropList.innerHTML = crops.map((crop, index) => `
        <div class="crop-item">
            <div>
                <h3>${escapeHTML(crop.crop)}</h3>
                <p>Farmer: ${escapeHTML(crop.name)}</p>
                <p>Quantity: ${Number(crop.quantity)} Quintals</p>
                <p>Location: ${escapeHTML(crop.location)}</p>
                <p>Harvest Date: ${escapeHTML(crop.date)}</p>
                <p>Storage: ${escapeHTML(crop.storage)}</p>
            </div>

            <div>
                <span class="crop-status">Saved</span>
                <button class="crop-delete"
                    onclick="deleteCrop(${index})">
                    Delete
                </button>
            </div>
        </div>
    `).join("");
}

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);
}

const cropForm = document.getElementById("cropForm");

if (cropForm) {
    cropForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const name = document.getElementById("farmerName").value.trim();
        const cropChoice = document.getElementById("cropName").value;
        const otherCrop = document.getElementById("otherCrop").value.trim();
        const crop = cropChoice === "Other" ? otherCrop : cropChoice;
        const quantity = Number(document.getElementById("quantity").value);
        const location = document.getElementById("location").value.trim();
        const date = document.getElementById("harvestDate").value;
        const storage = document.getElementById("storage").value;

        const message = document.getElementById("formMessage");

        if (!name || !crop || !Number.isFinite(quantity) ||
            quantity <= 0 || !location || !date || !storage) {
            message.textContent = "Please enter all valid harvest details.";
            return;
        }

        const today = new Date();
const localToday = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0")
].join("-");

if (date > localToday) {
    message.textContent = "Please enter a valid harvest date.";
    return;
}

        crops.push({
            name,
            crop,
            quantity,
            location,
            date,
            storage
        });

        saveCrops();
        updateDashboard();

        cropForm.reset();

        document.getElementById("otherCropGroup").hidden = true;

        message.textContent =
            "Your harvest details have been saved successfully!";

        message.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });
    });
}

const cropSelector = document.getElementById("cropName");

if (cropSelector) {
    cropSelector.addEventListener("change", function() {
        const otherGroup = document.getElementById("otherCropGroup");
        const otherInput = document.getElementById("otherCrop");

        otherGroup.hidden = this.value !== "Other";
        otherInput.required = this.value === "Other";
    });
}

function deleteCrop(index) {
    if (confirm("Are you sure you want to delete this crop record?")) {
        crops.splice(index, 1);
        saveCrops();
        updateDashboard();
    }
}

function openAdvisor() {
    window.location.href = "advisor.html";
}

function openDashboard() {
    window.location.href = "dashboard.html";
}

updateDashboard();


/* ==================================
   MANDI PRICE COMPARISON
   Illustrative demo data only
================================== */

const mandiSampleData = {
    Tomato: [
        { name: "Bhubaneswar Mandi", price: 1800, transport: 300 },
        { name: "Cuttack Mandi", price: 1950, transport: 450 },
        { name: "Puri Mandi", price: 1700, transport: 200 }
    ],
    Potato: [
        { name: "Bhubaneswar Mandi", price: 1400, transport: 300 },
        { name: "Cuttack Mandi", price: 1500, transport: 400 },
        { name: "Puri Mandi", price: 1350, transport: 200 }
    ],
    Onion: [
        { name: "Bhubaneswar Mandi", price: 2200, transport: 300 },
        { name: "Cuttack Mandi", price: 2350, transport: 450 },
        { name: "Puri Mandi", price: 2100, transport: 200 }
    ],
    Rice: [
        { name: "Bhubaneswar Mandi", price: 2500, transport: 300 },
        { name: "Cuttack Mandi", price: 2600, transport: 450 },
        { name: "Puri Mandi", price: 2450, transport: 200 }
    ],
    Wheat: [
        { name: "Bhubaneswar Mandi", price: 2300, transport: 300 },
        { name: "Cuttack Mandi", price: 2400, transport: 450 },
        { name: "Puri Mandi", price: 2200, transport: 200 }
    ],
    Maize: [
        { name: "Bhubaneswar Mandi", price: 2100, transport: 300 },
        { name: "Cuttack Mandi", price: 2250, transport: 450 },
        { name: "Puri Mandi", price: 2000, transport: 200 }
    ],
    Cabbage: [
        { name: "Bhubaneswar Mandi", price: 1200, transport: 300 },
        { name: "Cuttack Mandi", price: 1350, transport: 450 },
        { name: "Puri Mandi", price: 1100, transport: 200 }
    ],
    Cauliflower: [
        { name: "Bhubaneswar Mandi", price: 1800, transport: 300 },
        { name: "Cuttack Mandi", price: 1950, transport: 450 },
        { name: "Puri Mandi", price: 1700, transport: 200 }
    ]
};


const marketForm = document.getElementById("marketForm");

if (marketForm) {
    marketForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const crop = document.getElementById("marketCrop").value;
        const quantity = Number(document.getElementById("marketQuantity").value);
        const location = document.getElementById("marketLocation").value.trim();

        const results = document.getElementById("marketResults");
        const cards = document.getElementById("marketCards");
        const summary = document.getElementById("marketSummary");

        if (!crop || !Number.isFinite(quantity) || quantity <= 0 || !location) {
            alert("Please enter valid crop, quantity and location details.");
            return;
        }

        const markets = mandiSampleData[crop];

        if (!markets) {
            alert("No sample data available for this crop.");
            return;
        }

        const comparisons = markets.map(market => ({
            ...market,
            grossValue: market.price * quantity,
            netValue: (market.price * quantity) - market.transport
        }));

        comparisons.sort((a, b) => b.netValue - a.netValue);

        const bestMarket = comparisons[0];

        summary.textContent =
            `For ${quantity} quintals of ${crop} near ${location}, ${bestMarket.name} has the highest estimated amount after the listed transport cost.`;

        cards.innerHTML = comparisons.map((market, index) => `
            <div class="market-card ${index === 0 ? "market-best" : ""}">
                <div>
                    ${index === 0
                        ? '<span class="market-best-label">Best estimated option</span>'
                        : ""}
                    <h3>${market.name}</h3>
                    <p>Sample price: ₹${market.price.toLocaleString("en-IN")} / quintal</p>
                    <p>Estimated gross value: ₹${market.grossValue.toLocaleString("en-IN")}</p>
                    <p>Estimated transport cost: ₹${market.transport.toLocaleString("en-IN")}</p>
                    <p><strong>Estimated amount after transport: ₹${market.netValue.toLocaleString("en-IN")}</strong></p>
                </div>
            </div>
        `).join("");

        results.hidden = false;
        results.scrollIntoView({ behavior: "smooth", block: "start" });
    });
}


/* ==================================
   FASALMITRA SELLING ADVISOR
   Rule-based demo recommendations
================================== */

const advisorForm = document.getElementById("advisorForm");

if (advisorForm) {
    advisorForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const crop = document.getElementById("advisorCrop").value;
        const quantity = Number(document.getElementById("advisorQuantity").value);
        const storage = document.getElementById("advisorStorage").value;
        const harvestDate = document.getElementById("advisorHarvestDate").value;

        const results = document.getElementById("advisorResults");
        const output = document.getElementById("advisorOutput");

        if (!crop || !Number.isFinite(quantity) || quantity <= 0 ||
            !storage || !harvestDate) {
            alert("Please enter all valid harvest details.");
            return;
        }

        const today = new Date();
        const localToday = [
            today.getFullYear(),
            String(today.getMonth() + 1).padStart(2, "0"),
            String(today.getDate()).padStart(2, "0")
        ].join("-");

        if (harvestDate > localToday) {
            alert("Please enter a harvest date that is today or earlier.");
            return;
        }

        const harvestTime = new Date(harvestDate + "T00:00:00");
        const currentTime = new Date(localToday + "T00:00:00");

        const daysSinceHarvest = Math.floor(
            (currentTime - harvestTime) / (1000 * 60 * 60 * 24)
        );

        const perishableCrops = [
            "Tomato", "Cabbage", "Cauliflower"
        ];

        const highlyPerishable = perishableCrops.includes(crop);

        let recommendation;
        let reasons = [];

        if (highlyPerishable && daysSinceHarvest >= 3) {
            recommendation = "Prioritize selling promptly";
            reasons.push("This crop is perishable and has already been harvested for several days.");
            reasons.push("Delaying without suitable storage may increase quality and spoilage risks.");
            reasons.push("Compare nearby mandi prices before choosing a buyer.");
        } 
        else if (highlyPerishable && storage === "Unavailable") {
            recommendation = "Consider selling promptly";
            reasons.push("Suitable storage is unavailable for this perishable crop.");
            reasons.push("Avoid unnecessary delays that could reduce crop quality.");
            reasons.push("Compare transport costs and market prices before selling.");
        } 
        else if (storage === "Available" && !highlyPerishable) {
            recommendation = "Compare storage and selling options";
            reasons.push("You report having storage available.");
            reasons.push("You may compare storage charges with the potential benefit of waiting.");
            reasons.push("Future prices are uncertain, so storage does not guarantee higher returns.");
        } 
        else if (storage === "Limited") {
            recommendation = "Compare markets and storage carefully";
            reasons.push("Your storage capacity is limited.");
            reasons.push("Consider prioritizing the quantity that cannot be stored safely.");
            reasons.push("Check storage charges and local selling prices.");
        } 
        else {
            recommendation = "Compare available markets before selling";
            reasons.push("Your current details do not establish that waiting will be beneficial.");
            reasons.push("Compare estimated net returns after transport costs.");
            reasons.push("Check crop quality and local buyer demand.");
        }

        const storageAdvice = storage === "Unavailable"
            ? "No storage is available according to your input."
            : storage === "Limited"
                ? "Only limited storage is available according to your input."
                : "Storage is available according to your input.";

        output.innerHTML = `
            <div class="advisor-result-card">
                <h3>${recommendation}</h3>

                <p><strong>Crop:</strong> ${escapeHTML(crop)}</p>
                <p><strong>Quantity:</strong> ${quantity} quintals</p>
                <p><strong>Days since harvest:</strong> ${daysSinceHarvest}</p>
                <p><strong>Storage:</strong> ${storageAdvice}</p>

                <h4>Why this suggestion?</h4>
                <ul>
                    ${reasons.map(reason => `<li>${escapeHTML(reason)}</li>`).join("")}
                </ul>

                <p><strong>Next step:</strong> Compare mandi prices and check actual buyer offers before making your decision.</p>
            </div>
        `;

        results.hidden = false;
        results.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });
}


/* ==================================
   FASALMITRA STORAGE FINDER
   Illustrative demo facilities
================================== */

const storageForm = document.getElementById("storageForm");

const storageSampleData = [
    {
        name: "Bhubaneswar Storage Centre",
        location: "Bhubaneswar",
        type: "General Warehouse",
        capacity: 500,
        rate: 8
    },
    {
        name: "Cuttack Agricultural Warehouse",
        location: "Cuttack",
        type: "General Warehouse",
        capacity: 800,
        rate: 7
    },
    {
        name: "Puri Cold Storage",
        location: "Puri",
        type: "Cold Storage",
        capacity: 300,
        rate: 12
    }
];

if (storageForm) {
    storageForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const location = document.getElementById("storageLocation").value.trim();
        const crop = document.getElementById("storageCrop").value;
        const quantity = Number(document.getElementById("storageQuantity").value);
        const days = Number(document.getElementById("storageDays").value);

        const results = document.getElementById("storageResults");
        const summary = document.getElementById("storageSummary");
        const cards = document.getElementById("storageCards");

        if (!location || !crop || !Number.isFinite(quantity) ||
            quantity <= 0 || !Number.isInteger(days) || days < 1 || days > 365) {
            alert("Please enter valid storage details.");
            return;
        }

        const options = storageSampleData.filter(
            facility => quantity <= facility.capacity
        );

        summary.textContent =
            `Storage estimates for ${quantity} quintals of ${crop} near ${location} for ${days} days.`;

        if (options.length === 0) {
            cards.innerHTML =
                '<p class="storage-empty">No sample facility has enough listed capacity for this quantity. Try a smaller quantity.</p>';
        } else {
            cards.innerHTML = options.map(facility => {
                const totalCost = quantity * days * facility.rate;

                return `
                    <div class="storage-card">
                        <span class="storage-demo-label">Illustrative facility</span>
                        <h3>${escapeHTML(facility.name)}</h3>
                        <p><strong>Listed location:</strong> ${escapeHTML(facility.location)}</p>
                        <p><strong>Facility type:</strong> ${facility.type}</p>
                        <p><strong>Listed capacity:</strong> ${facility.capacity} quintals</p>
                        <p><strong>Illustrative rate:</strong> ₹${facility.rate} per quintal per day</p>
                        <p class="storage-cost">
                            Estimated total: ₹${totalCost.toLocaleString("en-IN")}
                        </p>
                    </div>
                `;
            }).join("");
        }

        results.hidden = false;
        results.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });
}
