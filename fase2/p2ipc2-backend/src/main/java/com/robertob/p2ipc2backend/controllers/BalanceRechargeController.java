package com.robertob.p2ipc2backend.controllers;

import com.robertob.p2ipc2backend.models.BalanceRecharge;
import com.robertob.p2ipc2backend.models.NewCommission;
import com.robertob.p2ipc2backend.services.BalanceRechargeService;
import com.robertob.p2ipc2backend.services.UserService;
import com.robertob.p2ipc2backend.utils.GsonUtils;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebServlet("/balance-recharge/*")
public class BalanceRechargeController extends HttpServlet {
    private final GsonUtils<BalanceRecharge> gsonBalanceRecharge;
    private final GsonUtils<NewCommission> gsonNewCommission;
    private final BalanceRechargeService balanceRechargeService;
    private final UserService userService;

    public BalanceRechargeController() {
        this.gsonBalanceRecharge = new GsonUtils<>();
        this.balanceRechargeService = new BalanceRechargeService();
        this.gsonNewCommission = new GsonUtils<>();
        this.userService = new UserService();
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        var id = ControllerUtils.getIdFromPath(request, response);
        if (id == -1) {
            return;
        }
        var user = userService.findOne(id);
        if (user == null) {
            System.out.println("log: error on getting user");
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Error: User not found or error on getting user");
            return;
        }

        var balanceRecharge = gsonBalanceRecharge.readFromJson(request, BalanceRecharge.class);
        System.out.println(balanceRecharge);

        var success = balanceRechargeService.create(balanceRecharge);
        if (!success) {
            System.out.println("log: error on creating balanceRecharge");
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Error on creating balanceRecharge");
            return;
        }
        response.setStatus(HttpServletResponse.SC_OK);
        gsonBalanceRecharge.sendAsJson(response, balanceRecharge);
    }

    // get method for history of balance recharges of a user
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        // if the route is: /balance-recharge/commissions-history we fetch all the history of commissions
        // so we check if the path is commissions-history
        var path = request.getPathInfo();
        if (path != null && path.equals("/commissions-history")) {
            var commissions = balanceRechargeService.findAllCommissionHistory();
            if (commissions == null) {
                System.out.println("log: error on getting commissions");
                response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Error: Commissions not found or error on getting commissions");
                return;
            }
            response.setStatus(HttpServletResponse.SC_OK);
            gsonBalanceRecharge.sendAsJson(response, commissions);
            return;
        }

        // if the route is: /balance-recharge/id
        var id = ControllerUtils.getIdFromPath(request, response);
        if (id == -1) {
            return;
        }
        var user = userService.findOne(id);
        if (user == null) {
            System.out.println("log: user doesnt exist or error on getting user");
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Error: User not found or error on getting user");
            return;
        }

        var balanceRecharges = balanceRechargeService.findAllByUserId(id);
        if (balanceRecharges == null) {
            System.out.println("log: error on getting balanceRecharges");
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Error: BalanceRecharges not found or error on getting balanceRecharges");
            return;
        }
        response.setStatus(HttpServletResponse.SC_OK);
        gsonBalanceRecharge.sendAsJson(response, balanceRecharges);
    }

    // put method to update the commission of the administrator
    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response) throws IOException {
        var newPercentage = gsonNewCommission.readFromJson(request, NewCommission.class);
        if (newPercentage == null) {
            System.out.println("log: error on getting newPercentage");
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Error: newPercentage not found or error on getting newPercentage");
            return;
        }
        var success = balanceRechargeService.updateAdminCommission(newPercentage.getPercentage());
        if (!success) {
            System.out.println("log: error on updating admin commission");
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Error: error on updating admin commission");
            return;
        }
        response.setStatus(HttpServletResponse.SC_OK);
    }
}
