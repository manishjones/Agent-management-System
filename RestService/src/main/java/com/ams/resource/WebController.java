package com.ams.resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Controller
@CrossOrigin
public class WebController {

	@RequestMapping("/")
    public String homeHtml() {
        return "HomePage.html";
    }
	
	@RequestMapping("/AddLicence")
    public String addLicenceHtml() {
        return "AddLicence.html";
    }
	
	@RequestMapping("/AdminHome")
    public String adminHomeHtml() {
        return "AdminHome.html";
    }
	
	@RequestMapping("/AgentRegistration")
    public String agentRegistrationHtml() {
        return "AgentRegistration.html";
    }
	
	@RequestMapping("/CalculateCommission")
    public String calculateCommissionHtml() {
        return "CalculateCommission.html";
    }
	
	@RequestMapping("/CustomerHome")
    public String customerHomeHtml() {
        return "CustomerHome.html";
    }
	
	@RequestMapping("/CustomerPolicyRegistration")
    public String customerPolicyRegistrationHtml() {
        return "CustomerPolicyRegistration.html";
    }
	
	@RequestMapping("/CustomerRegistration")
    public String customerRegistrationHtml() {
        return "CustomerRegistration.html";
    }
	
	@RequestMapping("/Login")
    public String loginHtml() {
        return "Login.html";
    }
	
	@RequestMapping("/ManageLicences")
    public String manageLicencesHtml() {
        return "MangeLicences.html";
    }
	
	@RequestMapping("/ViewAppointments")
    public String viewAppointmentsHtml() {
        return "ViewAppointments.html";
    }
	
	@RequestMapping("/ViewLicences")
    public String viewLicencesHtml() {
        return "ViewLicences.html";
    }
	
	@RequestMapping("/ScheduleAppointments")
    public String scheduleAppointmentsHtml() {
        return "ScheduleAppointments.html";
    }
	
}
