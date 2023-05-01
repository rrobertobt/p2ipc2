package com.robertob.p2ipc2backend.controllers;

import com.robertob.p2ipc2backend.models.User;
import com.robertob.p2ipc2backend.services.UserService;
import com.robertob.p2ipc2backend.utils.GsonUtils;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebServlet("/users/*")
public class UserController extends HttpServlet {
    private final GsonUtils<User> gsonUser;
    private final UserService userService;

    public UserController() {
        this.gsonUser = new GsonUtils<>();
        this.userService = new UserService();
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        var id = getIdFromPath(request, response);
        if (id == -1) {
            return;
        }
        var user = userService.findOne(id);
        if (user == null) {
            System.out.println("log: error on getting user");
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Error on getting user");
            return;
        }
        response.setStatus(HttpServletResponse.SC_OK);
        gsonUser.sendAsJson(response, user);
    }
    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response) throws IOException {
        boolean success = false;
        var id = getIdFromPath(request, response);
        var user = gsonUser.readFromJson(request, User.class);
        success = userService.update(user);
        if (!success) {
            System.out.println("log: error on updating user");
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Error on updating user");
            return;
        }
        response.setStatus(HttpServletResponse.SC_OK);
        gsonUser.sendAsJson(response, user);
    }

    private int getIdFromPath(HttpServletRequest request, HttpServletResponse response) throws IOException {
        var pathInfo = request.getPathInfo();
        if (pathInfo == null || pathInfo.equals("/")) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Missing id");
            return -1;
        }
        var id = Integer.parseInt(pathInfo.substring(1));
        if (id <= 0) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid id");
            return -1;
        }
        try {
            System.out.println("log: id: " + id);
            return id;
        } catch (NumberFormatException e) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid id");
            return -1;
        }

    }
}
