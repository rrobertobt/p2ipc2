package com.robertob.p2ipc2backend.controllers;

import com.robertob.p2ipc2backend.models.User;
import com.robertob.p2ipc2backend.services.UserService;
import com.robertob.p2ipc2backend.utils.GsonUtils;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

import com.robertob.p2ipc2backend.controllers.ControllerUtils;

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
        // check if the path is only /users
        var pathInfo = request.getPathInfo();
        if (pathInfo == null || pathInfo.equals("/")) {
            var users = userService.list();
            response.setStatus(HttpServletResponse.SC_OK);
            gsonUser.sendAsJson(response, users);
            return;
        }
        var id = ControllerUtils.getIdFromPath(request, response);
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
        var id = ControllerUtils.getIdFromPath(request, response);
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
}
