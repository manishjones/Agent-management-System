package com.ams.model.holder;

public class SingleAgentCommissionHolder {
	private String id;
	private int pol;
	private float total;
	private float app;
	private String name;
	private float commission;	
	
	public float getCommission() {
		return commission;
	}
	public void setCommission(float commission) {
		this.commission = commission;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public int getPol() {
		return pol;
	}
	public void setPol(int pol) {
		this.pol = pol;
	}
	public float getTotal() {
		return total;
	}
	public void setTotal(float total) {
		this.total = total;
	}
	public float getApp() {
		return app;
	}
	public void setApp(float app) {
		this.app = app;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}

	
}
