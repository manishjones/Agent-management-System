package com.ams.model;

import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.UniqueConstraint;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;


/**
 * @author h p
 */

@Entity
@Table(uniqueConstraints=@UniqueConstraint(columnNames="id"))
public class Customer {

    @Id
    @Column(unique = true)
    private String id;

    @Basic
    private String name;

    @Basic
    @Temporal(TemporalType.DATE)
    @Column(name="date_of_birth")
    private Date dateOfBirth;

    @Basic
    @Column(name="contact_number")
    private String contactNumber;

    @Basic
    @Column(name="email_address")
    private String emailAddress;

    @Basic
    @Column(name="zip_code")
    private String zipCode;

    @Basic
    private String city;

    @Basic
    private String state;

    @Basic
    private float height;

    @Basic
    private float weight;

    @Basic
    @Column(name="identification_mark")
    private String identificationMark;

    @Basic
    @Column(name="annual_income")
    private float annualIncome;

    @Basic
    @Column(name="annual_premiums")
    private float annualPremiums;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public float getHeight() {
        return height;
    }

    public void setHeight(float height) {
        this.height = height;
    }

    public float getWeight() {
        return weight;
    }

    public void setWeight(float weight) {
        this.weight = weight;
    }

    public String getIdentificationMark() {
        return identificationMark;
    }

    public void setIdentificationMark(String identificationMark) {
        this.identificationMark = identificationMark;
    }

    public float getAnnualIncome() {
        return annualIncome;
    }

    public void setAnnualIncome(float annualIncome) {
        this.annualIncome = annualIncome;
    }

    public float getAnnualPremiums() {
        return annualPremiums;
    }

    public void setAnnualPremiums(float annualPremiums) {
        this.annualPremiums = annualPremiums;
    }

}