package com.robertob.p2ipc2backend.controllers;

import com.robertob.p2ipc2backend.models.InitialSetupMedic;
import com.robertob.p2ipc2backend.services.InitialSetupMedicService;
import com.robertob.p2ipc2backend.utils.GsonUtils;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebServlet("/initial-setup-medic")
public class InitialSetupMedicController extends HttpServlet {
    private final GsonUtils<InitialSetupMedic> gsonInitialSetupMedic;
    private final InitialSetupMedicService initialSetupMedicService;

    public InitialSetupMedicController() {
        this.gsonInitialSetupMedic = new GsonUtils<>();
        this.initialSetupMedicService = new InitialSetupMedicService();
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        var initialSetupMedic = gsonInitialSetupMedic.readFromJson(request, InitialSetupMedic.class);
        if (initialSetupMedic == null) {
            System.out.println("log: error on getting initial setup medic");
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Error on getting initial setup medic");
            return;
        }
        var result = initialSetupMedicService.save(initialSetupMedic);
        if (!result) {
            System.out.println("log: error on saving initial setup medic");
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Error on saving initial setup medic");
            return;
        }
        response.setStatus(HttpServletResponse.SC_OK);
    }
}
