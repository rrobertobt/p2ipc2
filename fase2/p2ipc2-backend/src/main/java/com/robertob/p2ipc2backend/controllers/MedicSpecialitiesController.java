package com.robertob.p2ipc2backend.controllers;

import com.robertob.p2ipc2backend.models.AllMedicsSpecialities;
import com.robertob.p2ipc2backend.services.SpecialityService;
import com.robertob.p2ipc2backend.utils.GsonUtils;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebServlet("/medics-specialities/*")
public class MedicSpecialitiesController extends HttpServlet {
    GsonUtils<AllMedicsSpecialities> gsonAllMedicsSpecialities;
    SpecialityService specialityService;

    public MedicSpecialitiesController() {
        this.gsonAllMedicsSpecialities = new GsonUtils<>();
        this.specialityService = new SpecialityService();
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        // path is: /medics-specialities/id
        var pathInfo = request.getPathInfo();
        System.out.println(pathInfo);
        if (pathInfo == null) {
            var allMedicsSpecialities = specialityService.findAllMedicsSpecialities();
            System.out.println(allMedicsSpecialities);
            if (allMedicsSpecialities.size() == 0) {
                System.out.println("log: error on getting all medics specialities");
                response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Error on getting all medics specialities");
                return;
            }
            response.setStatus(HttpServletResponse.SC_OK);
            gsonAllMedicsSpecialities.sendAsJson(response, allMedicsSpecialities);
        }
        if (pathInfo.length() == 2) {
            String medicId = pathInfo.split("/")[1];
            var medicSpecialities = specialityService.findMedicsSpecialities(Integer.parseInt(medicId));
            response.setStatus(HttpServletResponse.SC_OK);
            gsonAllMedicsSpecialities.sendAsJson(response, medicSpecialities);
        } else {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        }
    }
}
