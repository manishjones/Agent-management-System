package com.ams.model;

import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 * @author h p
 */

@Entity
public class Policy {

    @Id
    @Column(unique = true)
    private String id;

    @Basic
    private String name;

    @Basic
    @Column(name="company_id")
    private String companyId;

    @Basic
    @Column(name="company_name")
    private String companyName;

    @Basic
    @Column(name="company_address")
    private String companyAddress;

    @Basic
    @Column(name="key_contact_name")
    private String keyContactName;

    @Basic
    @Column(name="key_contact_number")
    private String keyContactNumber;

    @Basic
    @Column(name="company_email")
    private String companyEMail;

    @Basic
    @Temporal(TemporalType.DATE)
    @Column(name="licence_registry_date")
    private Date licenceRegistryDate;

    @Basic
    @Temporal(TemporalType.DATE)
    @Column(name="licence_expiry_date")
    private Date licenceExpiryDate;

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

    public String getCompanyId() {
        return companyId;
    }

    public void setCompanyId(String companyId) {
        this.companyId = companyId;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getCompanyAddress() {
        return companyAddress;
    }

    public void setCompanyAddress(String companyAddress) {
        this.companyAddress = companyAddress;
    }

    public String getKeyContactName() {
        return keyContactName;
    }

    public void setKeyContactName(String keyContactName) {
        this.keyContactName = keyContactName;
    }

    public String getKeyContactNumber() {
        return keyContactNumber;
    }

    public void setKeyContactNumber(String keyContactNumber) {
        this.keyContactNumber = keyContactNumber;
    }

    public String getCompanyEMail() {
        return companyEMail;
    }

    public void setCompanyEMail(String companyEMail) {
        this.companyEMail = companyEMail;
    }

    public Date getLicenceRegistryDate() {
        return licenceRegistryDate;
    }

    public void setLicenceRegistryDate(Date licenceRegistryDate) {
        this.licenceRegistryDate = licenceRegistryDate;
    }

    public Date getLicenceExpiryDate() {
        return licenceExpiryDate;
    }

    public void setLicenceExpiryDate(Date licenceExpiryDate) {
        this.licenceExpiryDate = licenceExpiryDate;
    }

}