package com.robertob.p2ipc2backend.services;

import com.robertob.p2ipc2backend.database.AppointmentsRepository;
import com.robertob.p2ipc2backend.models.Appointment;
import com.robertob.p2ipc2backend.models.AppointmentTests;
import com.robertob.p2ipc2backend.models.NewAppointment;
import com.robertob.p2ipc2backend.models.UpdateAppointment;

import java.util.List;

public class AppointmentsService {
    private final AppointmentsRepository appointmentsRepository;
    private final AppointmentTestsService appointmentTestsService;

    public AppointmentsService() {
        this.appointmentsRepository = new AppointmentsRepository();
        this.appointmentTestsService = new AppointmentTestsService();
    }

    public boolean create(NewAppointment newAppointment) {
        return appointmentsRepository.create(newAppointment);
    }
    public List<Appointment> findAllMedicAppointments(int id, String date) {
        return appointmentsRepository.findAllMedicAppointments(id, date);
    }

    public Appointment findOne(int id) {
        return appointmentsRepository.findOne(id);
    }

    public boolean update(int id, UpdateAppointment updateAppointment) {
        try {
            if (updateAppointment.getAppointment_tests() != null && updateAppointment.getAppointment_tests().length > 0){
                this.appointmentTestsService.create(updateAppointment.getAppointment_tests());
                updateAppointment.setStatus("EXAMEN_PENDIETE");
            } else {
                updateAppointment.setStatus("FINALIZADA");
            }
            this.appointmentsRepository.update(id, updateAppointment);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
