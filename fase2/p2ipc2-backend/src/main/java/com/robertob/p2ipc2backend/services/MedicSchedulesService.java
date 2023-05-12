package com.robertob.p2ipc2backend.services;

import com.robertob.p2ipc2backend.database.MedicSchedulesRepository;

import java.util.List;

public class MedicSchedulesService {
    private final MedicSchedulesRepository medicSchedulesRepository;

    public MedicSchedulesService() {
        this.medicSchedulesRepository = new MedicSchedulesRepository();
    }

    public List<String> getMedicSchedules(int medic_id) {
        return this.medicSchedulesRepository.getMedicSchedules(medic_id);
    }

    public List<String> getMedicSchedules(int medic_id, String date) {
        return this.medicSchedulesRepository.getMedicSchedules(medic_id, date);
    }
}
