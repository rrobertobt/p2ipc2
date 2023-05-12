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
    private final MedicSchedulesService medicSchedulesService;

    public MedicSchedulesController() {
        this.gsonUtils = new GsonUtils<>();
        this.medicSchedulesService = new MedicSchedulesService();
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        var pathInfo = request.getPathInfo();
        if (pathInfo == null || pathInfo.equals("/")) {
            System.out.println("log: error on getting medic schedules");
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return;
        }
//        var id = ControllerUtils.getIdFromPath(request, response);
//        if (id == -1) {
//            return;
//        }
        String[] pathParts = pathInfo.split("/");
        if (pathParts.length != 3) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return;
        }

        String medicId = pathParts[1];
        String date = pathParts[2];
        var medicSchedules = medicSchedulesService.getMedicSchedules(Integer.parseInt(medicId), date);
//        var medicSchedules = medicSchedulesService.getMedicSchedules(id);
//        if (medicSchedules == null) {
//            System.out.println("log: error on getting medic schedules");
//            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
//            return;
//        }
        response.setStatus(HttpServletResponse.SC_OK);
        gsonUtils.sendAsJson(response, medicSchedules);
    }
}
