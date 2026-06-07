export const WARD_DATA = [
  { 
    id: 1, 
    name: "Kalas-Dhanori-Lohegaon", 
    corporators: [
      { name: "Ashwini Bhandare", party: "BJP", phone: "9100000001" },
      { name: "Dangat Sangita", party: "BJP", phone: "9100000002" },
      { name: "Rekha Tingre", party: "NCP", phone: "9100000003" },
      { name: "Anil Tingre", party: "BJP", phone: "9100000004" }
    ] 
  },
  { 
    id: 2, 
    name: "Phulenagar-Nagpur Chawl", 
    corporators: [
      { name: "Dhende Nandini", party: "NCP", phone: "9100000005" },
      { name: "Ravi Tingre", party: "NCP", phone: "9100000006" },
      { name: "Shital Sawant", party: "NCP", phone: "9100000007" },
      { name: "Suhas Tingre", party: "NCP", phone: "9100000008" }
    ] 
  },
  {
    id: 3,
    name: "Viman Nagar-Somnath Nagar",
    corporators: [
      { name: "Mukta Jagtap", party: "BJP", phone: "9100000025" },
      { name: "Bapu Karne", party: "NCP", phone: "9100000026" },
      { name: "Sunil Tingre", party: "NCP", phone: "9100000027" },
      { name: "Sheetal Shinde", party: "BJP", phone: "9100000028" }
    ]
  },
  { 
    id: 9, 
    name: "Sus-Baner-Pashan", 
    corporators: [
      { name: "Chimte Rohini", party: "BJP", phone: "9100000009" },
      { name: "Chandere Baburao", party: "NCP", phone: "9100000010" },
      { name: "Kokate Mayuri", party: "BJP", phone: "9100000011" },
      { name: "Amol Balwadkar", party: "NCP", phone: "9100000012" }
    ] 
  },
  { 
    id: 14, 
    name: "Koregaon Park-Ghorpadi-Mundhwa", 
    corporators: [
      { name: "Himali Kamble", party: "BJP", phone: "9100000013" },
      { name: "Dhayarkar Kishor", party: "BJP", phone: "9100000014" },
      { name: "Kawade Surekha", party: "NCP", phone: "9100000015" },
      { name: "Gaikwad Umesh", party: "BJP", phone: "9100000016" }
    ] 
  },
  {
    id: 15,
    name: "Mundhwa-Magarpatta City",
    corporators: [
      { name: "Yogesh Sasane", party: "NCP", phone: "9100000029" },
      { name: "Pramod Bhangire", party: "SS", phone: "9100000030" },
      { name: "Vandana Kodre", party: "NCP", phone: "9100000031" },
      { name: "Nitin Holkar", party: "BJP", phone: "9100000032" }
    ]
  },
  {
    id: 16,
    name: "Hadapsar-Sayyad Nagar",
    corporators: [
      { name: "Maruti Tupe", party: "NCP", phone: "9100000033" },
      { name: "Vasant More", party: "MNS", phone: "9100000034" },
      { name: "Farzana Shaikh", party: "NCP", phone: "9100000035" },
      { name: "Anand Alkunte", party: "BJP", phone: "9100000036" }
    ]
  },
  { 
    id: 24, 
    name: "Kasba Peth", 
    corporators: [
      { name: "Ganesh Bidkar", party: "BJP", phone: "9100000017" },
      { name: "Hemant Rasane", party: "BJP", phone: "9100000018" },
      { name: "Mukta Tilak", party: "BJP", phone: "9100000019" },
      { name: "Ravindra Dhangekar", party: "INC", phone: "9100000020" }
    ] 
  },
  { 
    id: 41, 
    name: "Parvati-Padmavati", 
    corporators: [
      { name: "Shrinath Bhimale", party: "BJP", phone: "9100000021" },
      { name: "Ashwini Kadam", party: "NCP", phone: "9100000022" },
      { name: "Mahesh Wable", party: "BJP", phone: "9100000023" },
      { name: "Sushama Andhare", party: "SS", phone: "9100000024" }
    ] 
  }
];

// Add placeholders for other wards to reach 41
for (let i = 1; i <= 41; i++) {
  if (!WARD_DATA.find(w => w.id === i)) {
    WARD_DATA.push({
      id: i,
      name: `Ward ${i} - PMC Area`,
      corporators: [
        { name: `Nagarsevak A (Ward ${i})`, party: "BJP", phone: "9100000000" },
        { name: `Nagarsevak B (Ward ${i})`, party: "NCP", phone: "9100000000" },
        { name: `Nagarsevak C (Ward ${i})`, party: "INC", phone: "9100000000" },
        { name: `Nagarsevak D (Ward ${i})`, party: "SS", phone: "9100000000" }
      ],
      // Adding randomized lat/lng for Pune area
      lat: 18.45 + Math.random() * 0.15,
      lng: 73.75 + Math.random() * 0.2,
      complaints: Math.floor(Math.random() * 50)
    });
  } else {
    // Add coordinates and complaints to existing real wards
    const ward = WARD_DATA.find(w => w.id === i);
    ward.lat = 18.45 + Math.random() * 0.15;
    ward.lng = 73.75 + Math.random() * 0.2;
    ward.complaints = Math.floor(Math.random() * 50);
  }
}

WARD_DATA.sort((a, b) => a.id - b.id);

export const ISSUE_CATEGORIES = [
  { id: 'pothole', label: 'Pothole', icon: '🕳️' },
  { id: 'garbage', label: 'Garbage', icon: '🗑️' },
  { id: 'streetlight', label: 'Streetlight', icon: '💡' },
  { id: 'water', label: 'Water', icon: '💧' },
  { id: 'tree', label: 'Tree/Park', icon: '🌳' },
  { id: 'illegal', label: 'Illegal construction', icon: '🏗️' },
  { id: 'stray', label: 'Stray animals', icon: '🐕' },
  { id: 'other', label: 'Other', icon: '⚠️' }
];
