package com.ams.repo;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ams.model.Agent;
import com.ams.model.Appointment;

public interface AgentRepository extends JpaRepository<Agent, String> {
	@Query(value="SELECT * FROM agent WHERE agent.id NOT IN (SELECT agent.id FROM agent LEFT JOIN appointment ON agent.id = appointment.agent_id WHERE appointment.time_slot = :slot_param AND appointment.date = :date_param) LIMIT 1",nativeQuery=true)
	List<Agent> findAvailableAgent(@Param("date_param") Date date_param,@Param("slot_param") String slot_param);
}