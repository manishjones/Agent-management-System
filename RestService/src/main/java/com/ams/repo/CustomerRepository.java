package com.ams.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ams.model.Customer;

public interface CustomerRepository extends JpaRepository<Customer,String> {
}
