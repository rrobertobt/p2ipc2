package com.robertob.p2ipc2backend.controllers;

import com.robertob.p2ipc2backend.models.TestType;
import com.robertob.p2ipc2backend.services.TestTypeService;
import com.robertob.p2ipc2backend.utils.GsonUtils;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebServlet("/test-types")
public class TestTypesController extends HttpServlet {

    private final GsonUtils<TestType> gsonTestType;
    private final TestTypeService testTypeService;

    public TestTypesController() {
        this.gsonTestType = new GsonUtils<>();
        this.testTypeService = new TestTypeService();
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        var testTypes = testTypeService.findAll();
        if (testTypes.size() == 0) {
            System.out.println("log: error on getting test types");
            resp.sendError(HttpServletResponse.SC_BAD_REQUEST, "Error on getting test types");
            return;
        }
        resp.setStatus(HttpServletResponse.SC_OK);
        gsonTestType.sendAsJson(resp, testTypes);
    }
}
