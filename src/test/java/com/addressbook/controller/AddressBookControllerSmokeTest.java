package com.addressbook.controller;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@SpringBootTest
@RunWith(SpringRunner.class)
public class AddressBookControllerSmokeTest {

	@Autowired
	private AddressBookController controller;
	
	@Test
	public void smokeTest() {
		assertThat(controller).isNotNull();
	}
}
