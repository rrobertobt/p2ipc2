package com.robertob.p2ipc2backend.controllers;

import com.robertob.p2ipc2backend.models.Appointment;
import com.robertob.p2ipc2backend.services.AppointmentsService;
import com.robertob.p2ipc2backend.utils.GsonUtils;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebServlet("/medics/*")
public class MedicsController extends HttpServlet {
    private final GsonUtils<Appointment> gsonUtilsAppointment;
    private final AppointmentsService appointmentsService;

    public MedicsController() {
        gsonUtilsAppointment = new GsonUtils<>();
        appointmentsService = new AppointmentsService();
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        // /medics/1/appointments/2023-01-01
        var pathInfo = request.getPathInfo();
        var pathParts = pathInfo.split("/");
        if (pathParts.length != 4) {
            System.out.println("log: error on getting appointments");
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Error: Appointments not found or error on getting appointments");
            return;
        }
        var id = Integer.parseInt(pathParts[1]);
        var date = pathParts[3];
        System.out.println("log: id: " + id + ", date: " + date);

        var appointments = appointmentsService.findAllMedicAppointments(id, date);
        if (appointments == null) {
            System.out.println("log: error on getting appointments");
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Error: Appointments not found or error on getting appointments");
            return;
        }
        response.setStatus(HttpServletResponse.SC_OK);
        gsonUtilsAppointment.sendAsJson(response, appointments);
    }
}
