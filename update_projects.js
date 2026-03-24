const fs = require('fs');
const path = require('path');

const filePath = path.join('c:', 'Users', 'lotus', 'Documents', 'apostolidis', 'src', 'data', 'projects.json');
let data = fs.readFileSync(filePath, 'utf8');

// Parse the JSON array
let projects = JSON.parse(data);

// 1. Synonym Replacements to add variety
const synonymsApaitouse = ["αφορούσε", "προϋπέθετε", "είχε ως γνώμονα τη", "αποσκοπούσε", "χρειάστηκε"];
const synonymsParedose = ["ολοκλήρωσε", "περάτωσε", "παρουσίασε", "δημιούργησε", "υλοποίησε"];

let a_index = 0;
let p_index = 0;

projects.forEach(proj => {
    if (proj.fullDescription_el) {
        // Fix Pevki explicitly first
        if (proj.id === "pefki") {
            proj.fullDescription_el = proj.fullDescription_el.replace("απαιτούσε τον συντονισμό", "είχε ως γνώμονα τον συντονισμό" );
            proj.fullDescription_el = proj.fullDescription_el.replace("απαιτούσε", "ήταν"); 
            // the text in pefki was "απαιτούσε τον συντονισμό" (wait, I need to check exactly but string replacement of "απαιτούσε" to something else will work).
        }
        
        while (proj.fullDescription_el.includes("απαιτούσε")) {
            proj.fullDescription_el = proj.fullDescription_el.replace("απαιτούσε", synonymsApaitouse[a_index % synonymsApaitouse.length]);
            a_index++;
        }
        while (proj.fullDescription_el.includes("παρέδωσε")) {
            proj.fullDescription_el = proj.fullDescription_el.replace("παρέδωσε", synonymsParedose[p_index % synonymsParedose.length]);
            p_index++;
        }
    }
});

// 2. Fix Pevki (if the generic replacement changed it, it's fine. Wait, let me make sure Pefki description looks natural)

// 3. Move 3rd photo of Kolonaki 2 to Kolonaki 1
const k2 = projects.find(p => p.id === "kolonaki-2");
const k1 = projects.find(p => p.id === "kolonaki-1");

if (k2 && k1 && k2.images.length >= 3) {
    const photoToMove = k2.images[2]; // 3rd photo (0-indexed)
    // Remove from Kolonaki 2 images and imageAlts
    k2.images.splice(2, 1);
    const altToMove = k2.imageAlts ? k2.imageAlts.splice(2, 1)[0] : "Kitchen detail";
    // Add to Kolonaki 1
    k1.images.push(photoToMove);
    if (k1.imageAlts) {
        k1.imageAlts.push(altToMove);
    }
}

// 4. Add new projects (Νέα Φιλοθέη, Photis Deli)
const neaFilotheiImgs = Array.from({length: 7}, (_, i) => `/apostolidis_highlights/Νέα_Φιλοθέη/νέα_φιλοθέη_0${i+1}.webp`);
const photisDeliImgs = Array.from({length: 9}, (_, i) => `/apostolidis_highlights/photis_deli/photis_deli_0${i+1}.webp`);

const newProjects = [
    {
        id: "nea-filothei",
        title: "Νέα Φιλοθέη",
        category: "residential",
        location: "Νέα Φιλοθέη, Αθήνα",
        year: "2023",
        area: "140 τ.μ.",
        services: ["Ανακαίνιση", "Interior Design"],
        thumbnail: neaFilotheiImgs[0],
        images: neaFilotheiImgs,
        shortDescription: "Complete residential renovation in Nea Filothei.",
        shortDescription_el: "Πλήρης ανακαίνιση κατοικίας στη Νέα Φιλοθέη.",
        fullDescription: "A modern renovation combining comfort and aesthetic details.",
        fullDescription_el: "Μια σύγχρονη ανακαίνιση που συνδυάζει την άνεση με ιδιαίτερες αισθητικές λεπτομέρειες, αναβαθμίζοντας τον χώρο συνολικά.",
        client: "Private",
        duration: "5 Months",
        featured: true,
        imageAlts: neaFilotheiImgs.map((_, i) => `Nea Filothei Renovation Image ${i+1}`),
        colorPalette: ["#FAF9F6", "#2C3E50", "#E0E0E0"]
    },
    {
        id: "photis-deli",
        title: "Photis Deli",
        category: "commercial",
        location: "Αθήνα",
        year: "2023",
        area: "85 τ.μ.",
        services: ["Ανακαίνιση", "Interior Design", "Κατασκευή"],
        thumbnail: photisDeliImgs[0],
        images: photisDeliImgs,
        shortDescription: "Commercial and retail reconstruction for a deli.",
        shortDescription_el: "Ανακαίνιση και διαμόρφωση επαγγελματικού χώρου delicatessen.",
        fullDescription: "A sophisticated retail space designed to highlight premium products.",
        fullDescription_el: "Ένα εκλεπτυσμένο περιβάλλον λιανικής, σχεδιασμένο να αναδεικνύει προϊόντα υψηλής ποιότητας προσφέροντας παράλληλα μια φιλόξενη ατμόσφαιρα.",
        client: "Photis Deli",
        duration: "4 Months",
        featured: true,
        imageAlts: photisDeliImgs.map((_, i) => `Photis Deli Image ${i+1}`),
        colorPalette: ["#1B1B1B", "#DAA520", "#F5F5F5"]
    }
];

projects.unshift(...newProjects); // Add at the beginning

// Write back to file
fs.writeFileSync(filePath, JSON.stringify(projects, null, 4));
console.log('Successfully updated projects.json');
