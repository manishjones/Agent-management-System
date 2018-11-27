package com.ams.resource;

import java.util.ArrayList;

import java.util.Date;
import java.util.HashMap;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.ComponentScans;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ams.model.AdminPassword;
import com.ams.model.Agent;
import com.ams.model.Appointment;
import com.ams.model.Customer;
import com.ams.model.CustomerPassword;
import com.ams.model.Policy;
import com.ams.model.RegisteredPolicy;
import com.ams.model.holder.AgentHolder;
import com.ams.model.holder.AllAgentsCommissionHolder;
import com.ams.model.holder.AppointmentHolder;
import com.ams.model.holder.CustomerHolder;
import com.ams.model.holder.LoginHolder;
import com.ams.model.holder.PolicyHolder;
import com.ams.model.holder.RegisteredPolicyHolder;
import com.ams.model.holder.RenewalHolder;
import com.ams.model.holder.SingleAgentCommissionHolder;
import com.ams.repo.AdminPasswordRepository;
import com.ams.repo.AdminRepository;
import com.ams.repo.AgentRepository;
import com.ams.repo.AppointmentRepository;
import com.ams.repo.CustomerPasswordRepository;
import com.ams.repo.CustomerRepository;
import com.ams.repo.PolicyRepository;
import com.ams.repo.RegisteredPolicyRepository;
import com.ams.security.HashGenerator;

@RestController
@CrossOrigin
public class RestResourse {

	@Autowired
	private AdminPasswordRepository apr;
	@Autowired
	private AdminRepository ar;
	@Autowired
	private AppointmentRepository aptr;
	@Autowired
	private CustomerPasswordRepository cpr;
	@Autowired
	private CustomerRepository cr;
	@Autowired
	private PolicyRepository pr;
	@Autowired
	private RegisteredPolicyRepository rpr;
	@Autowired
	private AgentRepository agr;

	@PostMapping("/admin/password")
	public @ResponseBody ResponseEntity<String> getAdminPassword(@RequestBody LoginHolder lh) {
		List<AdminPassword> list = apr.getAdminPassword(lh.getUsername());
		if (!list.isEmpty()) {
			String password=list.get(0).getPassword();
			if(HashGenerator.getSHA(lh.getPassword()).equals(password)) {
				return new ResponseEntity<String>(HttpStatus.OK);
			}
		}
		return new ResponseEntity<String>(HttpStatus.NOT_FOUND);
	}

	@PostMapping("/customer/password")
	public @ResponseBody ResponseEntity<String> getCustomerPassword(@RequestBody LoginHolder lh) {
		List<CustomerPassword> list = cpr.getCustomerPassword(lh.getUsername());
		if (!list.isEmpty()) {
			String password=list.get(0).getPassword();
			if(HashGenerator.getSHA(lh.getPassword()).equals(password)) {
				return new ResponseEntity<String>(HttpStatus.OK);
			}
		}
		return new ResponseEntity<String>(HttpStatus.NOT_FOUND);
	}

	@GetMapping("/customer/appointment/{id}")
	public @ResponseBody ResponseEntity<List<Appointment>> getCustomerAppointments(@PathVariable String id) {
		List<Appointment> list = aptr.getCustomerAppointments(id);
		if (!list.isEmpty()) {
			return new ResponseEntity<List<Appointment>>(list, HttpStatus.OK);
		}
		return new ResponseEntity<List<Appointment>>(HttpStatus.NOT_FOUND);
	}
	
	
	@GetMapping("/admin/appointment/")
	public @ResponseBody ResponseEntity<List<Appointment>> getAppointments() {
		List<Appointment> list = aptr.getPendingRegistrations();
		if (!list.isEmpty()) {
			return new ResponseEntity<List<Appointment>>(list, HttpStatus.OK);
		}
		return new ResponseEntity<List<Appointment>>(HttpStatus.NOT_FOUND);
	}
	

	@PostMapping("/customer/register")
	public ResponseEntity<String> registerCustomer(@RequestBody CustomerHolder ch) {

		Customer customer = new Customer();
		CustomerPassword cp = new CustomerPassword();

		customer.setAnnualIncome(ch.getIncome());
		customer.setAnnualPremiums(ch.getPremiums());
		customer.setCity(ch.getCity());
		customer.setContactNumber(ch.getContactno());
		customer.setDateOfBirth(ch.getDob());
		customer.setEmailAddress(ch.getEmail());
		customer.setHeight(ch.getHeight());
		customer.setIdentificationMark(ch.getMark());
		customer.setName(ch.getName());
		customer.setState(ch.getState());
		customer.setWeight(ch.getWeight());
		customer.setZipCode(ch.getZipcode());

		List<Customer> list = cr.findAll();
		if (list.isEmpty()) {
			customer.setId("CU0001");
		} else {
			String id = list.get(list.size() - 1).getId();
			int i = Integer.parseInt(id.substring(2), 10);
			i++;
			String genId = String.format("CU%04d", i);
			customer.setId(genId);
		}

		cp.setCustomer(customer);
		cp.setPassword(HashGenerator.getSHA(ch.getPassword()));

		if (!cr.existsById(customer.getId())) {
			cr.save(customer);
			cpr.save(cp);
			return new ResponseEntity<String>(customer.getId(), HttpStatus.OK);
		}

		return new ResponseEntity<String>("Details could not be saved", HttpStatus.EXPECTATION_FAILED);
	}

	@PostMapping("/admin/agent/register")
	public ResponseEntity<String> registerAgent(@RequestBody AgentHolder ah) {

		Agent agent = new Agent();

		agent.setName(ah.getName());
		agent.setDateOfBirth(ah.getDob());
		agent.setEmailAddress(ah.getEmail());
		agent.setContactNumber(ah.getContact());
		agent.setcAddress(ah.getcAddress());
		agent.setpAddress(ah.getpAddress());
		agent.setCity(ah.getCity());
		agent.setState(ah.getState());
		agent.setZipCode(ah.getZipcode());
		agent.setDateOfBirth(ah.getDob());
		agent.setDateOfJoining(ah.getDoj());
		agent.setEmploymentType(ah.getType());
		agent.setApid(ah.getApid());
		agent.setIdType(ah.getIdType());

		List<Agent> list = agr.findAll();
		if (list.isEmpty()) {
			agent.setId("AG0001");
		} else {
			String id = list.get(list.size() - 1).getId();
			int i = Integer.parseInt(id.substring(2), 10);
			i++;
			String genId = String.format("AG%04d", i);
			agent.setId(genId);
		}

		if (!agr.existsById(agent.getId())) {
			Agent saved = agr.save(agent);
			if (saved != null)
				return new ResponseEntity<String>(agent.getId(), HttpStatus.OK);
		}

		return new ResponseEntity<String>("Not Saved", HttpStatus.EXPECTATION_FAILED);
	}

	@PostMapping("/customer/appointment/schedule")
	public ResponseEntity<String> scheduleAppointment(@RequestBody AppointmentHolder ah) {

		Appointment appointment = new Appointment();

		Customer customer = cr.findById(ah.getCid()).get();
		Agent agent = agr.findById(ah.getAid()).get();

		appointment.setAgent(agent);
		appointment.setCustomer(customer);
		appointment.setDate(ah.getDoa());
		appointment.setTimeSlot(ah.getSlot());
		appointment.setStatus("Pending");

		Appointment saved = aptr.save(appointment);

		if (saved != null) {
			SimpleDateFormat sdf = new SimpleDateFormat("MM-dd-yyyy");
			String dStr = sdf.format(appointment.getDate());
			return new ResponseEntity<String>("Appointment Scheduled On " + dStr, HttpStatus.OK);
		}
		return new ResponseEntity<String>("Not Saved", HttpStatus.EXPECTATION_FAILED);
	}

	@PostMapping("/admin/licence/add")
	public ResponseEntity<String> addLicence(@RequestBody PolicyHolder ph) {

		Policy policy = new Policy();

		policy.setCompanyAddress(ph.getAddress());
		policy.setCompanyEMail(ph.getEmail());
		policy.setCompanyId(ph.getCid());
		policy.setCompanyName(ph.getComname());
		policy.setKeyContactName(ph.getConname());
		policy.setKeyContactNumber(ph.getContact());
		policy.setLicenceExpiryDate(ph.getDoe());
		policy.setLicenceRegistryDate(ph.getDor());
		policy.setName(ph.getName());

		List<Policy> list = pr.findAll();
		if (list.isEmpty()) {
			policy.setId("PO0001");
		} else {
			String id = list.get(list.size() - 1).getId();
			int i = Integer.parseInt(id.substring(2), 10);
			i++;
			String genId = String.format("PO%04d", i);
			policy.setId(genId);
		}

		if (!pr.existsById(policy.getId())) {
			Policy saved = pr.save(policy);
			if (saved != null) {
				return new ResponseEntity<String>(policy.getId(), HttpStatus.OK);
			}
		}
		return new ResponseEntity<String>("Not Saved", HttpStatus.EXPECTATION_FAILED);
	}
	
	@PostMapping("/admin/licence/renew")
	public ResponseEntity<String> renewLicence(@RequestBody Policy policy) {

			Policy saved = pr.save(policy);
			if (saved != null) {
				return new ResponseEntity<String>(policy.getId(), HttpStatus.OK);
			}
		return new ResponseEntity<String>("Not Saved", HttpStatus.EXPECTATION_FAILED);
	}

	@GetMapping("/admin/policy")
	public @ResponseBody ResponseEntity<List<Policy>> getPolicyDetails() {
		List<Policy> list = pr.findAll();
		if (!list.isEmpty()) {
			return new ResponseEntity<List<Policy>>(list, HttpStatus.OK);
		}
		return new ResponseEntity<List<Policy>>(HttpStatus.NOT_FOUND);
	}
	
	@GetMapping("/admin/policy/{id}")
	public @ResponseBody ResponseEntity<Policy> getSinglePolicyDetails(@PathVariable String id) {
		Policy policy = pr.findById(id).get();
		return new ResponseEntity<Policy>(policy,HttpStatus.OK);
	}

	@PostMapping("/admin/customer/policy/register")
	public ResponseEntity<String> registerPolicy(@RequestBody RegisteredPolicyHolder rph) {

		RegisteredPolicy rPolicy = new RegisteredPolicy();

		Customer customer = cr.findById(rph.getCustid()).get();
		Agent agent = agr.findById(rph.getAgentid()).get();
		Policy policy = pr.findById(rph.getPolid()).get();
		Appointment appointment=aptr.findById(Long.parseLong(rph.getAppid())).get();
		
		appointment.setStatus("Success");
		

		rPolicy.setAgent(agent);
		rPolicy.setBookingDate(rph.getDate());
		rPolicy.setCommissionType(rph.getComtype());
		rPolicy.setCustomer(customer);
		rPolicy.setNomineeDOB(rph.getDob());
		rPolicy.setNomineeName(rph.getName());
		rPolicy.setNomineeRelationship(rph.getRelation());
		rPolicy.setPaymentMode(rph.getMode());
		rPolicy.setPolicy(policy);
		rPolicy.setTotalSumAssured(rph.getSum());
		rPolicy.setAppointment(appointment);
		
		

		Appointment savedAppointment=aptr.save(appointment);
		RegisteredPolicy saved = rpr.save(rPolicy);
		if (saved != null)
			return new ResponseEntity<String>(policy.getId(), HttpStatus.OK);
		return new ResponseEntity<String>("Not Saved", HttpStatus.EXPECTATION_FAILED);
	}

	@GetMapping("customer/getagent/{date}/{timeslot}")
	public ResponseEntity<String> getAvailableAgent(@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date date,
			@PathVariable String timeslot) {
		List<Agent> list = agr.findAvailableAgent(date, timeslot);
		if (!list.isEmpty()) {
			return new ResponseEntity<String>(list.get(0).getId(), HttpStatus.OK);
		}
		return new ResponseEntity<String>("", HttpStatus.NOT_FOUND);
	}

	@GetMapping("admin/commission/{from}/{to}")
	public ResponseEntity<List<AllAgentsCommissionHolder>> getCommissions(
			@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date from,
			@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date to) {
		List<RegisteredPolicy> list = rpr.findByDateRange(from, to);

		if (!list.isEmpty()) {
			Map<String, Float> map = new HashMap<String, Float>();
			for (int i = 0; i < list.size(); i++) {
				String key = list.get(i).getAgent().getId();
				float value = list.get(i).getTotalSumAssured();
				String type = list.get(i).getCommissionType();

				if (value < 200000.0f) {
					if (type.equals("I")) {
						value = value * 0.015f;
					} else if (type.equals("II")) {
						value = value * 0.02f;
					} else if (type.equals("III")) {
						value = value * 0.03f;
					}
				} else if (value >= 200000.0f && value < 500000.0f) {
					if (type.equals("I")) {
						value = value * 0.025f;
					} else if (type.equals("II")) {
						value = value * 0.03f;
					} else if (type.equals("III")) {
						value = value * 0.05f;
					}
				} else if (value >= 500000.0f && value < 1000000.0f) {
					if (type.equals("I")) {
						value = value * 0.04f;
					} else if (type.equals("II")) {
						value = value * 0.05f;
					} else if (type.equals("III")) {
						value = value * 0.07f;
					}
				} else if (value >= 1000000.0f) {
					if (type.equals("I")) {
						value = value * 0.05f;
					} else if (type.equals("II")) {
						value = value * 0.07f;
					} else if (type.equals("III")) {
						value = value * 0.1f;
					}
				}
				if (map.containsKey(key)) {
					value += map.get(key);
				}
				map.put(key, value);
			}

			Map<String, Float> map2 = new HashMap<String, Float>();
			for (int i = 0; i < list.size(); i++) {
				String key = list.get(i).getAgent().getId();
				float value = list.get(i).getTotalSumAssured();
				if (map2.containsKey(key)) {
					value += map2.get(key);
				}
				map2.put(key, value);
			}

			Set<String> set = map.keySet();
			List<AllAgentsCommissionHolder> cList = new ArrayList<AllAgentsCommissionHolder>();
			for (String key : set) {

				AllAgentsCommissionHolder aach = new AllAgentsCommissionHolder();
				aach.setId(key);
				aach.setName(agr.findById(key).get().getName());
				aach.setCommission(map.get(key));
				aach.setTotal(map2.get(key));

				cList.add(aach);
			}

			if (!cList.isEmpty())
				return new ResponseEntity<List<AllAgentsCommissionHolder>>(cList, HttpStatus.OK);
		}
		return new ResponseEntity<List<AllAgentsCommissionHolder>>(HttpStatus.NOT_FOUND);
	}

	@GetMapping("admin/commission/{id}/{from}/{to}")
	public ResponseEntity<SingleAgentCommissionHolder> getSingleAgentCommission(@PathVariable String id,
			@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date from,
			@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date to) {

		List<RegisteredPolicy> list = rpr.findByIdAndDateRange(id, from, to);

		if (!list.isEmpty()) {
			float total = 0.0f;
			float commission = 0.0f;
			for (int i = 0; i < list.size(); i++) {
				float value = list.get(i).getTotalSumAssured();
				String type = list.get(i).getCommissionType();
				total += value;

				if (value < 200000.0f) {
					if (type.equals("I")) {
						value = value * 0.015f;
					} else if (type.equals("II")) {
						value = value * 0.02f;
					} else if (type.equals("III")) {
						value = value * 0.03f;
					}
				} else if (value >= 200000.0f && value < 500000.0f) {
					if (type.equals("I")) {
						value = value * 0.025f;
					} else if (type.equals("II")) {
						value = value * 0.03f;
					} else if (type.equals("III")) {
						value = value * 0.05f;
					}
				} else if (value >= 500000.0f && value < 1000000.0f) {
					if (type.equals("I")) {
						value = value * 0.04f;
					} else if (type.equals("II")) {
						value = value * 0.05f;
					} else if (type.equals("III")) {
						value = value * 0.07f;
					}
				} else if (value >= 1000000.0f) {
					if (type.equals("I")) {
						value = value * 0.05f;
					} else if (type.equals("II")) {
						value = value * 0.07f;
					} else if (type.equals("III")) {
						value = value * 0.1f;
					}
				}
				commission+=value;
			}
			
			
			int pol=list.size();
			
			int app=aptr.findByAgentId(id).size();
			
			String name=agr.findById(id).get().getName();
			
			SingleAgentCommissionHolder sach=new SingleAgentCommissionHolder();
			
			sach.setApp(app);
			sach.setId(id);
			sach.setName(name);
			sach.setPol(pol);
			sach.setTotal(total);
			sach.setCommission(commission);
			
			return new ResponseEntity<SingleAgentCommissionHolder>(sach,HttpStatus.OK);
		}
		
		return new ResponseEntity<SingleAgentCommissionHolder>(HttpStatus.NOT_FOUND);
	}
	
	@GetMapping("/admin/agent")
	public @ResponseBody ResponseEntity<List<Agent>> getAllAgents() {
		List<Agent> list = agr.findAll();
		if (!list.isEmpty()) {
			return new ResponseEntity<List<Agent>>(list, HttpStatus.OK);
		}
		return new ResponseEntity<List<Agent>>(HttpStatus.NOT_FOUND);
	}
	
	@GetMapping("/admin/customer")
	public @ResponseBody ResponseEntity<List<Customer>> getAllCustomers() {
		List<Customer> list = cr.findAll();
		if (!list.isEmpty()) {
			return new ResponseEntity<List<Customer>>(list, HttpStatus.OK);
		}
		return new ResponseEntity<List<Customer>>(HttpStatus.NOT_FOUND);
	}
	
	@GetMapping("/admin/customer/appointment/fail/{id}")
	public @ResponseBody ResponseEntity<?> failAppointment(@PathVariable String id) {
		Appointment apt = aptr.findById(Long.parseLong(id)).get();
		apt.setStatus("Failed");
		Appointment apt2=aptr.save(apt);
		if(apt2!=null) return new ResponseEntity<String>("Successful",HttpStatus.OK);
		return new ResponseEntity<String>("Unsuccessful",HttpStatus.EXPECTATION_FAILED);
	}
}