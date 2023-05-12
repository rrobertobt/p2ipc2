package com.robertob.p2ipc2backend.controllers;

import com.robertob.p2ipc2backend.models.Appointment;
import com.robertob.p2ipc2backend.models.NewAppointment;
import com.robertob.p2ipc2backend.models.UpdateAppointment;
import com.robertob.p2ipc2backend.services.AppointmentsService;
import com.robertob.p2ipc2backend.utils.GsonUtils;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebServlet("/appointments/*")
public class AppointmentsController extends HttpServlet {
    private final GsonUtils<NewAppointment> gsonUtils;
    private final GsonUtils<Appointment> gsonUtilsAppointment;
    private final GsonUtils<UpdateAppointment> gsonUtilsUpdateAppointment;

    private final AppointmentsService appointmentsService;

    public AppointmentsController() {
        gsonUtils = new GsonUtils<>();
        appointmentsService = new AppointmentsService();
        gsonUtilsAppointment = new GsonUtils<>();
        gsonUtilsUpdateAppointment = new GsonUtils<>();
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        var newAppointment = gsonUtils.readFromJson(request, NewAppointment.class);
        System.out.println(newAppointment);

        var success = appointmentsService.create(newAppointment);
        if (!success) {
            System.out.println("log: error on creating appointment");
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Error on creating appointment");
            return;
        }
        response.setStatus(HttpServletResponse.SC_OK);
        gsonUtils.sendAsJson(response, newAppointment);
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        var id = ControllerUtils.getIdFromPath(request, response);
        if (id == -1) {
            return;
        }
        var appointment = appointmentsService.findOne(id);
        if (appointment == null) {
            System.out.println("log: error on getting appointment");
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Error: Appointment not found or error on getting appointment");
            return;
        }
        response.setStatus(HttpServletResponse.SC_OK);
        gsonUtilsAppointment.sendAsJson(response, appointment);
    }

    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response) throws IOException {
        var updateAppointment = gsonUtilsUpdateAppointment.readFromJson(request, UpdateAppointment.class);
        var id = ControllerUtils.getIdFromPath(request, response);
        if (id == -1) {
            return;
        }
        var appointment = appointmentsService.update(id, updateAppointment);
        if (!appointment) {
            System.out.println("log: error on getting appointment");
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Error: Appointment not found or error on getting appointment");
            return;
        }
        response.setStatus(HttpServletResponse.SC_OK);
        gsonUtilsAppointment.sendAsJson(response, updateAppointment);
    }
}
