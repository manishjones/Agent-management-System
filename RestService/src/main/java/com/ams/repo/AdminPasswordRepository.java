package com.ams.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ams.model.AdminPassword;

public interface AdminPasswordRepository extends JpaRepository<AdminPassword, Long> {
	@Query(value="SELECT * FROM admin_password ap WHERE ap.admin_id=:passId",nativeQuery=true)
	List<AdminPassword> getAdminPassword(@Param("passId") String passId);
}
