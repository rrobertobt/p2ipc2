package com.robertob.p2ipc2backend.services;

import com.robertob.p2ipc2backend.database.AppointmentTestsRepository;
import com.robertob.p2ipc2backend.models.AppointmentTests;

public class AppointmentTestsService {
    private final AppointmentTestsRepository appointmentTestsRepository;

    public AppointmentTestsService() {
        this.appointmentTestsRepository = new AppointmentTestsRepository();
    }

    public boolean create(AppointmentTests[] appointmentTests) {
        return appointmentTestsRepository.create(appointmentTests);
    }
}
