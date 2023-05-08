package com.robertob.p2ipc2backend.controllers;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.stream.Collectors;

public class ControllerUtils {
    public static int getIdFromPath(HttpServletRequest request, HttpServletResponse response) throws IOException {
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
