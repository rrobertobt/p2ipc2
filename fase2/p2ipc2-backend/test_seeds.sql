INSERT INTO specialities (name, description) VALUES
('Cardiology', 'Cardiology is a branch of medicine dealing with disorders of the heart as well as parts of the circulatory system. The field includes medical diagnosis and treatment of congenital heart defects, coronary artery disease, heart failure, valvular heart disease and electrophysiology. Physicians who specialize in this field of medicine are called cardiologists, a specialty of internal medicine. Pediatric cardiologists are pediatricians who specialize in cardiology. Physicians who specialize in cardiac surgery are called cardiothoracic surgeons or cardiac surgeons, a specialty of general surgery. Although the cardiovascular system is inextricably linked to blood, cardiology is relatively unconcerned with hematology and its diseases. Some obvious exceptions that affect the function of the heart would be blood tests (electrolyte disturbances, troponins), decreased oxygen carrying capacity (anemia, hypovolemic shock), and coagulopathies.'),
('Dermatology', 'Dermatology is the branch of medicine dealing with the skin, nails, hair and its diseases. It is a specialty with both medical and surgical aspects. A dermatologist treats diseases, in the widest sense, and some cosmetic problems of the skin, scalp, hair, and nails.'),
('Endocrinology', 'Endocrinology is a branch of biology and medicine dealing with the endocrine system, its diseases, and its specific secretions known as hormones. It is also concerned with the integration of developmental events proliferation, growth, and differentiation, and the psychological or behavioral activities of metabolism, growth and development, tissue function, sleep, digestion, respiration, excretion, mood, stress, lactation, movement, reproduction, and sensory perception caused by hormones. Specializations include behavioral endocrinology and comparative endocrinology.'),
('Gastroenterology', 'Gastroenterology is the branch of medicine focused on the digestive system and its disorders.'),
('Geriatrics', 'Geriatrics or geriatric medicine is a specialty that focuses on health care of elderly people. It aims to promote health by preventing and treating diseases and disabilities in older adults. There is no set age at which patients may be under the care of a geriatrician, or geriatric physician, a physician who specializes in the care of elderly people. Rather, this decision is determined by the individual patients needs, and the availability of a specialist.'),
('Hematology', 'Hematology, also spelled haematology, is the branch of medicine concerned with the study of the cause, prognosis, treatment, and prevention of diseases related to blood. It involves treating diseases that affect the production of blood and its components, such as blood cells, hemoglobin, blood proteins, bone marrow, platelets, blood vessels, spleen, and the mechanism of coagulation. Such diseases might include hemophilia, blood clots, other bleeding disorders and blood cancers such as leukemia, multiple myeloma, and lymphoma. The laboratory work that goes into the study of blood is frequently performed by a medical technologist or medical laboratory scientist.'),
('Immunology', 'Immunology is a branch of biology that covers the study of immune systems in all organisms. Immunology charts, measures, and contextualizes the physiological functioning of the immune system in states of both health and diseases malfunctions of the immune system in immunological disorders such as autoimmune diseases, hypersensitivities, immune deficiency');

INSERT INTO test_types (name, description) VALUES
('Blood test', 'A blood test is a laboratory analysis performed on a blood sample that is usually extracted from a vein in the arm using a hypodermic needle, or via fingerprick. Multiple tests for specific blood components, such as a glucose test or a cholesterol test, are often grouped together into one test panel called a blood panel or blood work. Blood tests are often used in health care to determine physiological and biochemical states, such as disease, mineral content, pharmaceutical drug effectiveness, and organ function. Typical clinical blood panels include a basic metabolic panel or a complete blood count. Blood tests are also used in drug tests to detect drug abuse. In some of the United States, a blood test is required before marriage; historically, this was previously true in more states.'),
('Urine test', 'A urine test strip or dipstick test is a basic diagnostic tool used to determine pathological changes in a patients urine in standard urinalysis. A standard urine test strip may comprise up to 10 different chemical pads or reagents which react (change color) when immersed in, and then removed from, a urine sample. The test can often be read in as little as 60 to 120 seconds after dipping, although certain tests require longer.'),
('Stool test', 'A stool test involves the collection and analysis of fecal matter to diagnose the presence or absence of a medical condition. The patient and/or health care worker in the office or at the bedside is able to perform some types of stool tests quickly (within minutes) and cheaply. Other tests are more complicated and expensive, and may require hours to days to get results.'),
('Biopsy', 'A biopsy is a medical test commonly performed by a surgeon, interventional radiologist, or an interventional cardiologist involving extraction of sample cells or tissues for examination to determine the presence or extent of a disease. The tissue is generally examined under a microscope by a pathologist, and can also be analyzed chemically. When an entire lump or suspicious area is removed, the procedure is called an excisional biopsy. When only a sample of tissue is removed with preservation of the histological architecture of the tissue’s cells, the procedure is called an incisional biopsy or core biopsy. When a sample of tissue or fluid is removed with a needle in such a way that cells are removed without preserving the histological architecture of the tissue cells, the procedure is called a needle aspiration biopsy. Biopsies are most commonly performed');

# INSERT INTO appointments (medic_id, speciality_id, patient_id, date, schedule, report, price, commission) VALUES
# (2, 3, 1, '2023-05-6', '09:00', '', 40, 0.04);