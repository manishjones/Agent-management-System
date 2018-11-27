package com.ams.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ams.model.Policy;

public interface PolicyRepository extends JpaRepository<Policy, String> {

}
