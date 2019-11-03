package com.addressbook;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Stream;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import com.addressbook.dao.AddressBookRespository;

@Component
//this will make sure the commandlinerunner is not run during tests marked with the test profile
@Profile("!test")
public class Initializer implements CommandLineRunner {

	private final AddressBookRespository addressRepository;
	
	public Initializer(AddressBookRespository addressRepository) {
		this.addressRepository = addressRepository;
	}
	
	@Override
	public void run(String... strings) {
		List<Address> testAddresses = new ArrayList<Address>(
				Arrays.asList(new Address(null, "James", "Carter", "James.Carter@hotmail.com", "8051119999", "110 W. Liberty St.","","Madison","WI", "53001"),
						new Address(null, "Helen", "Leary", "Helen.Leary@yahoo.com", "8052228888","638 Cardinal Ave.","Apt. 2","Sun Prairie", "WI", "53002"),
						new Address(null, "Linda", "Douglas", "Linda.Douglas@gmail.com", "8053339999","2693 Commerce St.", "","Northridge", "CA", "91368"),
						new Address(null, "Rafael", "Ortega", "Rafael.Ortega@aol.com", "8053337777","563 Friendly St.","Suite 21","Cambria", "CA","93428"),
						new Address(null, "Henry", "Stevens", "Henry.Stevens@hs.com", "8053334444","2387 S. Fair Way","","Thousand Oaks", "CA","91361"),
						new Address(null, "Sharon", "Jenkins", "Sharon.Jenkins@csun.edu", "8053331111","105 N. Lake St.","","Paso Robles", "CA","93458")));
		testAddresses.forEach((address) -> {
			addressRepository.save(address);
		});
	}
}
