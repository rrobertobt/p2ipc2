package com.robertob.p2ipc2backend.controllers;

import com.robertob.p2ipc2backend.services.MedicSchedulesService;
import com.robertob.p2ipc2backend.utils.GsonUtils;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebServlet("/medics-schedules/*")
public class MedicSchedulesController extends HttpServlet {

    private final GsonUtils<String> gsonUtils;
    private final GsonUtils<String[]> gsonUtilsArray;
    private final MedicSchedulesService medicSchedulesService;

    public MedicSchedulesController() {
        this.gsonUtils = new GsonUtils<>();
        this.medicSchedulesService = new MedicSchedulesService();
        this.gsonUtilsArray = new GsonUtils<>();
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        var pathInfo = request.getPathInfo();
        if (pathInfo == null || pathInfo.equals("/")) {
            System.out.println("log: error on getting medic schedules");
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return;
        }
        String[] pathParts = pathInfo.split("/");
        if (pathParts.length == 3) {
            String medicId = pathParts[1];
            String date = pathParts[2];
            var medicSchedules = medicSchedulesService.getMedicSchedules(Integer.parseInt(medicId), date);
            response.setStatus(HttpServletResponse.SC_OK);
            gsonUtils.sendAsJson(response, medicSchedules);
        } else if (pathParts.length == 2) {
            String medicId = pathParts[1];
            var medicSchedules = medicSchedulesService.getMedicSchedules(Integer.parseInt(medicId));
            response.setStatus(HttpServletResponse.SC_OK);
            gsonUtils.sendAsJson(response, medicSchedules);
        } else {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        }


    }

    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response) throws IOException {
        var pathInfo = request.getPathInfo();
        if (pathInfo == null || pathInfo.equals("/")) {
            System.out.println("log: error on updating medic schedules");
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return;
        }
        var id = ControllerUtils.getIdFromPath(request, response);
        if (id == -1) {
            return;
        }
        var medicSchedules = gsonUtilsArray.readFromJson(request, String[].class);
        var success = medicSchedulesService.updateSchedules(medicSchedules, id);
        if (!success) {
            System.out.println("log: error on updating medic schedules");
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return;
        }
        response.setStatus(HttpServletResponse.SC_OK);
        gsonUtilsArray.sendAsJson(response, medicSchedules);
    }
}
