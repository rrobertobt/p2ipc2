package com.robertob.p2ipc2backend.services;

import com.robertob.p2ipc2backend.database.LaboratoryTestTypesRepository;
import com.robertob.p2ipc2backend.database.UserRepository;
import com.robertob.p2ipc2backend.models.InitialSetupLaboratory;

public class InitialSetupLaboratoryService {

    private final LaboratoryTestTypesRepository laboratoryTestTypesRepository;
    private final UserRepository userRepository;

    public InitialSetupLaboratoryService() {
        this.laboratoryTestTypesRepository = new LaboratoryTestTypesRepository();
        this.userRepository = new UserRepository();
    }

    public boolean save(InitialSetupLaboratory initialSetupLaboratory) {
        try {
            this.laboratoryTestTypesRepository.insert(initialSetupLaboratory);
            this.userRepository.finishInitialSetup(initialSetupLaboratory.getUser_id());
            return true;
        } catch (Exception e) {
            System.out.println("log: " + e.getMessage());
            return false;
        }
    }

}
