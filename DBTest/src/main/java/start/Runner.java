package start;

import org.hibernate.Session;
import org.hibernate.SessionFactory;

import hibernate.HibernateUtils;

public class Runner {
	public static void main(String[] args) {

		SessionFactory sf = HibernateUtils.getSessionFactory();
		Session ses = sf.openSession();

		ses.beginTransaction().commit();

		HibernateUtils.shutdown();
	}
}