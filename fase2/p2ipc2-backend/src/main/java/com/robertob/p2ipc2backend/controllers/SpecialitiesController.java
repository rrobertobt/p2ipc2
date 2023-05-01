package com.robertob.p2ipc2backend.controllers;

import com.robertob.p2ipc2backend.models.Speciality;
import com.robertob.p2ipc2backend.services.SpecialityService;
import com.robertob.p2ipc2backend.utils.GsonUtils;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.List;

@WebServlet("/specialities")
public class SpecialitiesController extends HttpServlet {
    private final GsonUtils<Speciality> gsonSpeciality;
    private final SpecialityService specialityService;

    public SpecialitiesController() {
        this.gsonSpeciality = new GsonUtils<>();
        this.specialityService = new SpecialityService();
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, IOException {
        var specialities = specialityService.findAll();
        if (specialities.size() == 0) {
            System.out.println("log: error on getting specialities");
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Error on getting specialities");
            return;
        }
        response.setStatus(HttpServletResponse.SC_OK);
        gsonSpeciality.sendAsJson(response, specialities);
    }
}
