package com.ams.model.holder;

import java.util.Date;

public class RegisteredPolicyHolder {
private String custid;
private String polid;
private String agentid;
private Date date;
private float sum;
private String mode;
private String comtype;
private String name;
private String relation;
private Date dob;
private String appid;

public String getAppid() {
	return appid;
}
public void setAppid(String appid) {
	this.appid = appid;
}
public String getCustid() {
	return custid;
}
public void setCustid(String custid) {
	this.custid = custid;
}
public String getPolid() {
	return polid;
}
public void setPolid(String polid) {
	this.polid = polid;
}
public String getAgentid() {
	return agentid;
}
public void setAgentid(String agentid) {
	this.agentid = agentid;
}
public Date getDate() {
	return date;
}
public void setDate(Date date) {
	this.date = date;
}
public float getSum() {
	return sum;
}
public void setSum(float sum) {
	this.sum = sum;
}
public String getMode() {
	return mode;
}
public void setMode(String mode) {
	this.mode = mode;
}
public String getComtype() {
	return comtype;
}
public void setComtype(String comtype) {
	this.comtype = comtype;
}
public String getName() {
	return name;
}
public void setName(String name) {
	this.name = name;
}
public String getRelation() {
	return relation;
}
public void setRelation(String relation) {
	this.relation = relation;
}
public Date getDob() {
	return dob;
}
public void setDob(Date dob) {
	this.dob = dob;
}

}
