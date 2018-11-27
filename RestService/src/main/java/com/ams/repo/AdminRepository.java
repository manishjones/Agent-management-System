package com.ams.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ams.model.Admin;

public interface AdminRepository extends JpaRepository<Admin, String> {

}
