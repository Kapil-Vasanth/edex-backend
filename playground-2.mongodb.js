// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use('test');

// Create a new document in the collection.
db.getCollection('students').insertMany(
    [
        {
            "student_id": "AAIN01",
            "first_name": "Aakshy",
            "last_name": "Shah",
            "citizenship": "India",
            "program": "Masters in Project Management",
            "university": "Auckland university of Technology",
            "remarks": "Finshed study"
        },
        {
            "student_id": "MAIN02",
            "first_name": "Mario",
            "last_name": " Micheal ",
            "citizenship": "India",
            "program": "Masters in Professional accounting ",
            "university": "Auckland university of Technology",
            "remarks": "studying"
        },
        {
            "student_id": "NEIN03",
            "first_name": "Neha",
            "last_name": " Dhiman",
            "citizenship": "India",
            "program": " PG Dip in  Biomedical Science",
            "university": "Auckland university of Technology",
            "remarks": "studying"
        },
        {
            "student_id": "MOIN04",
            "first_name": "Mohamed",
            "last_name": "",
            "citizenship": "India",
            "program": "Masters in Project Management",
            "university": "Auckland university of Technology",
            "remarks": "Joining first week Aug 25"
        },
        {
            "student_id": "NEIN05",
            "first_name": "Neetesh",
            "last_name": "",
            "citizenship": "India",
            "program": "Masters in Civil Engineering",
            "university": "Auckland university of Technology",
            "remarks": "Joining first week Aug 25"
        },
        {
            "student_id": "GADU06",
            "first_name": "Gabriella",
            "last_name": "DSouza",
            "citizenship": "Dubai",
            "program": "MBA",
            "university": "Auckland university of Technology",
            "remarks": "Fished study"
        },
        {
            "student_id": "MEIN07",
            "first_name": "Mercy",
            "last_name": "Bollam",
            "citizenship": "India",
            "program": "MBA",
            "university": "AIS St.Helens, Auckland NZ",
            "remarks": "studying"
        },
        {
            "student_id": "FIIN08",
            "first_name": "Fizza",
            "last_name": " Payandeh",
            "citizenship": "India",
            "program": "MBA ",
            "university": "AIS St.Helens, Auckland NZ",
            "remarks": "studying"
        },
        {
            "student_id": "RAIN09",
            "first_name": "Radhika ",
            "last_name": "Swarup",
            "citizenship": "India",
            "program": "MBA",
            "university": "AIS St.Helens, Auckland NZ",
            "remarks": "studying"
        },
        {
            "student_id": "KHIN10",
            "first_name": "Khushbu ",
            "last_name": "Gagsina",
            "citizenship": "India",
            "program": "NZ Dip in Hospitality",
            "university": "AIS St.Helens, Auckland NZ",
            "remarks": "studying"
        },
        {
            "student_id": "ILMA11",
            "first_name": "Ilango",
            "last_name": "Natarajan",
            "citizenship": "Malaysia",
            "program": "Masters in Sustainability",
            "university": "TOIT, Rotarua",
            "remarks": "studying"
        },
        {
            "student_id": "ALIN12",
            "first_name": "Aliya",
            "last_name": "Siddiqua ",
            "citizenship": "India",
            "program": "Ealry Childhood Education ",
            "university": "NZTC, Category 1, Auckland",
            "remarks": "studying"
        },
        {
            "student_id": "JEAU13",
            "first_name": "Jeena",
            "last_name": " Wilson ",
            "citizenship": "Auckland",
            "program": "Ealry Childhood Education ",
            "university": "NZTC, Category 1, Auckland",
            "remarks": "studying"
        },
        {
            "student_id": "EVFU14",
            "first_name": "Evaangeline ",
            "last_name": "Caroll",
            "citizenship": "Fujiera",
            "program": "Ealry Childhood Education ",
            "university": "NZTC, Category 1, Auckland",
            "remarks": "TBC"
        },
        {
            "student_id": "NIIN15",
            "first_name": "Nivithraa",
            "last_name": " Jaganivas",
            "citizenship": "India",
            "program": " Masters of Fintech & Investment Management",
            "university": "Linclon University, Christchurch ",
            "remarks": "studying"
        },
        {
            "student_id": "ALIN16",
            "first_name": "Alex",
            "last_name": "John",
            "citizenship": "India",
            "program": " Masters in Health Care Level 9",
            "university": "Eastern Institute of Technology",
            "remarks": "studying"
        },
        {
            "student_id": "MOIN17",
            "first_name": "Mona",
            "last_name": " Marlle",
            "citizenship": "India",
            "program": " Bachelor Degree for Quantity in Survey",
            "university": "Future Skills",
            "remarks": "Finished Dip, continue degree"
        },
        {
            "student_id": "ISIN18",
            "first_name": "Ishita",
            "last_name": " Thakur ",
            "citizenship": "India",
            "program": "Bachelors in Media Design ",
            "university": "Media Design School,  Auckland",
            "remarks": "studying"
        },
        {
            "student_id": "GUIN19",
            "first_name": "Gurujoth",
            "last_name": " Singh",
            "citizenship": "India",
            "program": "Ignite College-  Cert. in Culinary Arts ",
            "university": "Future Skills",
            "remarks": "studying"
        },
        {
            "student_id": "WAIN20",
            "first_name": "Waris",
            "last_name": " Bhagat",
            "citizenship": "India",
            "program": "NZ Diploma in Construction Quantity Surveying ",
            "university": "Otago Polytech,  Auckland",
            "remarks": "studying"
        },
        {
            "student_id": "NASR21",
            "first_name": "Nazia",
            "last_name": "Shahmy ",
            "citizenship": "Sri Lanka",
            "program": "NZ Dip in Construction Mgnt & Quality Surey",
            "university": "ACTS College, Auckland",
            "remarks": "studying"
        },
        {
            "student_id": "JODU22",
            "first_name": "Joshua",
            "last_name": "Dsouza",
            "citizenship": "Dubai",
            "program": "Mechanical Engineering",
            "university": "International College of Auckland",
            "remarks": "Finished study"
        },
        {
            "student_id": "JOIN23",
            "first_name": "Joy",
            "last_name": "Joshmon",
            "citizenship": "India",
            "program": "Civil Engineering",
            "university": "International College of Auckland",
            "remarks": "TBC fees paid"
        },
        {
            "student_id": "VEIN24",
            "first_name": "Veena ",
            "last_name": "Johnson",
            "citizenship": "India",
            "program": "Civil Engineering",
            "university": "International College of Auckland",
            "remarks": "Finished study"
        },
        {
            "student_id": "PRIN25",
            "first_name": "Prashanth",
            "last_name": "Prathap",
            "citizenship": "India",
            "program": "Pilot program",
            "university": "NZ Airlines Aviation, Omaru",
            "remarks": "Studying"
        },
        {
            "student_id": "JOIN26",
            "first_name": "John ",
            "last_name": "Phinehas",
            "citizenship": "India",
            "program": "Construction Management",
            "university": "Future skills",
            "remarks": "Joining first week Aug 25"
        },
        {
            "student_id": "GAIN27",
            "first_name": "Ganapthy",
            "last_name": "Srinivasan",
            "citizenship": "India",
            "program": "Master Business analytics",
            "university": "Yoobee ",
            "remarks": "Joining first week Aug 25"
        },
        {
            "student_id": "ARIN28",
            "first_name": "Arun",
            "last_name": "Renuka",
            "citizenship": "India",
            "program": "Master Business analytics",
            "university": "Yoobee ",
            "remarks": "Joining first week Aug 26"
        },
        {
            "student_id": "NISI29",
            "first_name": "Niveda ",
            "last_name": "Stephen",
            "citizenship": "Singapore",
            "program": "Master Business analytics",
            "university": "Yoobee ",
            "remarks": "TBC"
        },
        {
            "student_id": "SIIN30",
            "first_name": "Sieena",
            "last_name": "Elizabeth",
            "citizenship": "India",
            "program": "MBBS ",
            "university": "Mahsa University, Malaysia",
            "remarks": "TBC"
        }
    ]
);
