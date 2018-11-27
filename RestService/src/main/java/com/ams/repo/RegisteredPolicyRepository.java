package com.ams.repo;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ams.model.AdminPassword;
import com.ams.model.CustomerPassword;
import com.ams.model.RegisteredPolicy;

public interface RegisteredPolicyRepository extends JpaRepository<RegisteredPolicy, Long> {
	
	@Query(value="SELECT * FROM registered_policy rp WHERE rp.booking_date >= :from AND rp.booking_date <= :to",nativeQuery=true)
	List<RegisteredPolicy> findByDateRange(@Param("from") Date from,@Param("to") Date to);
	
	@Query(value="SELECT * FROM registered_policy rp WHERE rp.agent_id = :id AND rp.booking_date >= :from AND rp.booking_date <= :to",nativeQuery=true)
	List<RegisteredPolicy> findByIdAndDateRange(@Param("id") String id, @Param("from") Date from,@Param("to") Date to);
}
