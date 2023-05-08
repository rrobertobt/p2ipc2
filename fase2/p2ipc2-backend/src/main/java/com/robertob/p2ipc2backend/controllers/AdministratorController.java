package com.robertob.p2ipc2backend.controllers;

import com.robertob.p2ipc2backend.models.Administrator;
import com.robertob.p2ipc2backend.models.User;
import com.robertob.p2ipc2backend.services.UserService;
import com.robertob.p2ipc2backend.utils.GsonUtils;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebServlet("/administrator")
public class AdministratorController extends HttpServlet {
    private final GsonUtils<Administrator> gsonUser;
    private final UserService userService;

    public AdministratorController() {
        this.gsonUser = new GsonUtils<>();
        this.userService = new UserService();
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        var admin = gsonUser.readFromJson(request, Administrator.class);
        boolean success = false;
        success = userService.createAdmin(admin);
        if (!success) {
            System.out.println("log: error on creating user");
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Error on creating user");
            return;
        }
        response.setStatus(HttpServletResponse.SC_CREATED);
        gsonUser.sendAsJson(response, admin);
    }

}
