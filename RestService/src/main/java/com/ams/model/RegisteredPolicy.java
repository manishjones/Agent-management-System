package com.ams.model;

import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 * @author h p
 */

@Entity
@Table(name="registered_policy")
public class RegisteredPolicy {

    @Id
    @GeneratedValue
    private Long id;

    @Basic
    @Temporal(TemporalType.DATE)
    @Column(name="booking_date")
    private Date bookingDate;

    @Basic
    @Column(name="nominee_name")
    private String nomineeName;

    @Basic
    @Column(name="nominee_relationship")
    private String nomineeRelationship;

    @Basic
    @Temporal(TemporalType.DATE)
    @Column(name="nominee_dob")
    private Date nomineeDOB;

    @Basic
    @Column(name="total_sum_assured")
    private float totalSumAssured;

    @Basic
    @Column(name="payment_mode")
    private String paymentMode;

    @Basic
    @Column(name="commission_type")
    private String commissionType;

    @ManyToOne
    private Policy policy;

    @ManyToOne
    @JoinColumn(name = "agent_id")
    private Agent agent;

    @ManyToOne
    private Customer customer;
    
    @ManyToOne
    private Appointment appointment;

    public Appointment getAppointment() {
		return appointment;
	}

	public void setAppointment(Appointment appointment) {
		this.appointment = appointment;
	}

	public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getBookingDate() {
        return bookingDate;
    }

    public void setBookingDate(Date bookingDate) {
        this.bookingDate = bookingDate;
    }

    public String getNomineeName() {
        return nomineeName;
    }

    public void setNomineeName(String nomineeName) {
        this.nomineeName = nomineeName;
    }

    public String getNomineeRelationship() {
        return nomineeRelationship;
    }

    public void setNomineeRelationship(String nomineeRelationship) {
        this.nomineeRelationship = nomineeRelationship;
    }

    public Date getNomineeDOB() {
        return nomineeDOB;
    }

    public void setNomineeDOB(Date nomineeDOB) {
        this.nomineeDOB = nomineeDOB;
    }

    public float getTotalSumAssured() {
        return totalSumAssured;
    }

    public void setTotalSumAssured(float totalSumAssured) {
        this.totalSumAssured = totalSumAssured;
    }

    public String getPaymentMode() {
        return paymentMode;
    }

    public void setPaymentMode(String paymentMode) {
        this.paymentMode = paymentMode;
    }

    public String getCommissionType() {
        return commissionType;
    }

    public void setCommissionType(String commissionType) {
        this.commissionType = commissionType;
    }

    public Policy getPolicy() {
        return policy;
    }

    public void setPolicy(Policy policy) {
        this.policy = policy;
    }

    public Agent getAgent() {
        return agent;
    }

    public void setAgent(Agent agent) {
        this.agent = agent;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

}