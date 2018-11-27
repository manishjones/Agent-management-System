package com.ams.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ams.model.CustomerPassword;

public interface CustomerPasswordRepository extends JpaRepository<CustomerPassword, Long> {
		@Query(value="SELECT * FROM customer_password cp WHERE cp.customer_id=:passId",nativeQuery=true)
		List<CustomerPassword> getCustomerPassword(@Param("passId") String passId);
}
