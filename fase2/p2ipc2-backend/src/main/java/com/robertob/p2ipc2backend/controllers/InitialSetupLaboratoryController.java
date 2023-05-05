package com.robertob.p2ipc2backend.controllers;

import com.robertob.p2ipc2backend.models.InitialSetupLaboratory;
import com.robertob.p2ipc2backend.services.InitialSetupLaboratoryService;
import com.robertob.p2ipc2backend.utils.GsonUtils;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebServlet("/initial-setup-laboratory")
public class InitialSetupLaboratoryController extends HttpServlet {

    private final GsonUtils<InitialSetupLaboratory> gsonInitialSetupLaboratory;
    private final InitialSetupLaboratoryService initialSetupLaboratoryService;

    public InitialSetupLaboratoryController(){
        this.gsonInitialSetupLaboratory = new GsonUtils<>();
        this.initialSetupLaboratoryService = new InitialSetupLaboratoryService();
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        var initialSetupLaboratory = gsonInitialSetupLaboratory.readFromJson(req, InitialSetupLaboratory.class);
        if (initialSetupLaboratory == null) {
            System.out.println("log: error on getting initial setup laboratory");
            resp.sendError(HttpServletResponse.SC_BAD_REQUEST, "Error on getting initial setup laboratory");
            return;
        }
        var result = initialSetupLaboratoryService.save(initialSetupLaboratory);
        if (!result) {
            System.out.println("log: error on saving initial setup laboratory");
            resp.sendError(HttpServletResponse.SC_BAD_REQUEST, "Error on saving initial setup laboratory");
            return;
        }
        resp.setStatus(HttpServletResponse.SC_OK);
    }
}
