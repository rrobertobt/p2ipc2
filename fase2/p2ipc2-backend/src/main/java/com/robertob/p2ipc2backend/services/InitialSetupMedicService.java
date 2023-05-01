package com.robertob.p2ipc2backend.services;

import com.robertob.p2ipc2backend.database.MedicSchedulesRepository;
import com.robertob.p2ipc2backend.database.MedicsSpecialitiesRepository;
import com.robertob.p2ipc2backend.database.UserRepository;
import com.robertob.p2ipc2backend.models.InitialSetupMedic;

public class InitialSetupMedicService {

    private final MedicSchedulesRepository medicsSchedulesService;
    private final MedicsSpecialitiesRepository medicsSpecialitiesService;
    private final UserRepository userRepository;

    public InitialSetupMedicService() {
        this.medicsSchedulesService = new MedicSchedulesRepository();
        this.medicsSpecialitiesService = new MedicsSpecialitiesRepository();
        this.userRepository = new UserRepository();
    }
    public boolean save(InitialSetupMedic initialSetupMedic) {
        try {
            this.medicsSchedulesService.insert(initialSetupMedic);
            this.medicsSpecialitiesService.insert(initialSetupMedic);
            this.userRepository.finishInitialSetup(initialSetupMedic.getUser_id());
            return true;
        } catch (Exception e) {
            System.out.println("log: " + e.getMessage());
            return false;
        }
    }
}
