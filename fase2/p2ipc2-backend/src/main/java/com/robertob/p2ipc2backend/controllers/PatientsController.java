package com.robertob.p2ipc2backend.controllers;

import com.robertob.p2ipc2backend.models.Appointment;
import com.robertob.p2ipc2backend.services.AppointmentsService;
import com.robertob.p2ipc2backend.utils.GsonUtils;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebServlet("/patients/*")
public class PatientsController extends HttpServlet {
    private final GsonUtils<Appointment> gsonUtilsAppointment;
    private final AppointmentsService appointmentsService;

    public PatientsController() {
        gsonUtilsAppointment = new GsonUtils<>();
        appointmentsService = new AppointmentsService();
    }

    @Override
    protected void doGet (HttpServletRequest request, HttpServletResponse response) throws IOException {
        //patients/1/appointments
        var pathInfo = request.getPathInfo();
        var pathParts = pathInfo.split("/");
        if (pathParts.length != 3) {
            System.out.println("log: error on getting appointments");
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Error: Appointments not found or error on getting appointments");
            return;
        }
        var id = Integer.parseInt(pathParts[1]);
        System.out.println("log: id: " + id);
        var appointments = appointmentsService.findAllPatientAppointments(id);
        if (appointments == null) {
            System.out.println("log: error on getting appointments");
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Error: Appointments not found or error on getting appointments");
            return;
        }
        response.setStatus(HttpServletResponse.SC_OK);
        gsonUtilsAppointment.sendAsJson(response, appointments);
    }
}
