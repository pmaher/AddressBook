package com.addressbook.controller;

import static org.hamcrest.CoreMatchers.is;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.then;
import static org.mockito.Matchers.any;
import static org.mockito.Matchers.argThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentMatcher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import com.addressbook.Address;
import com.addressbook.dao.AddressBookRespository;
import com.fasterxml.jackson.databind.ObjectMapper;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class AddressBookControllerIntegrationTest {
	
	@MockBean
	public AddressBookRespository addressBookRepository;
	
	@Autowired
    private MockMvc mockMvc;
	
	Address address1;
	Address address2;
	List<Address> addressList;
	
	@Before
	public void setup() {
		address1 = new Address(1L, "Joe", "Shmo", "joe@shmo.com", "805-999-9999", "324 Channel Islands Blvd","apt 2","Cambria","CA", "93428");
		address2 = new Address(2L, "Jane", "Shmoo", "jane@shmoo.com", "805-888-8888", "333 Channel Islands Blvd","apt 1","Northridge","New York", "3333");
		addressList = new ArrayList<Address>();
		addressList.add(address1);
		addressList.add(address2);
	}

	@Test
	public void getAddressByIdHappyPath() throws Exception {
		//GIVEN a few addresses stored in the database
		given(this.addressBookRepository.findOne(2L)).willReturn(address2);
		//WHEN calling the api to list a single address by ID
		MockHttpServletRequestBuilder builder = MockMvcRequestBuilders.get("/api/address/"+address2.getId());
		ResultActions action = this.mockMvc.perform(builder);
		
		//THEN the appropriate address is shown
		action
			.andExpect(status().isOk())
			.andExpect(jsonPath("$.firstName", is(address2.getFirstName())))
			.andExpect(jsonPath("$.lastName", is(address2.getLastName())))
			.andExpect(jsonPath("$.email", is(address2.getEmail())))
			.andExpect(jsonPath("$.phone", is(address2.getPhone())))
			.andExpect(jsonPath("$.address", is(address2.getAddress())))
			.andExpect(jsonPath("$.address2", is(address2.getAddress2())))
			.andExpect(jsonPath("$.city", is(address2.getCity())))
			.andExpect(jsonPath("$.state", is(address2.getState())))
			.andExpect(jsonPath("$.zipcode", is(address2.getZipcode())));
	}
	
	@Test
	public void getAddressByIdNotFound() throws Exception {
		//GIVEN an empty address database
		given(this.addressBookRepository.findOne(2L)).willReturn(null);
		
		//WHEN calling the api to list a single address by ID
		MockHttpServletRequestBuilder builder = MockMvcRequestBuilders.get("/api/address/"+address2.getId());
		ResultActions action = this.mockMvc.perform(builder);
		
		//THEN we get a status of NOT_FOUND
		action
			.andExpect(status().isNotFound());
	}
	
	@Test
	public void testGetAllAddressesHappyPath() throws Exception {
		//GIVEN a few addresses stored in the database
		given(this.addressBookRepository.findAll()).willReturn(addressList);
		
		//WHEN calling the api to list all addresses
		MockHttpServletRequestBuilder builder = MockMvcRequestBuilders.get("/api/address");
		ResultActions action = this.mockMvc.perform(builder);
		
		//THEN all addresses should be returned
		action
			.andExpect(status().isOk())
			.andExpect(jsonPath("$[0].firstName", is(address1.getFirstName())))
			.andExpect(jsonPath("$[0].lastName", is(address1.getLastName())))
			.andExpect(jsonPath("$[0].email", is(address1.getEmail())))
			.andExpect(jsonPath("$[0].phone", is(address1.getPhone())))
			.andExpect(jsonPath("$[0].address", is(address1.getAddress())))
			.andExpect(jsonPath("$[0].address2", is(address1.getAddress2())))
			.andExpect(jsonPath("$[0].city", is(address1.getCity())))
			.andExpect(jsonPath("$[0].state", is(address1.getState())))
			.andExpect(jsonPath("$[0].zipcode", is(address1.getZipcode())))		
			.andExpect(jsonPath("$[1].firstName", is(address2.getFirstName())))
			.andExpect(jsonPath("$[1].lastName", is(address2.getLastName())))
			.andExpect(jsonPath("$[1].email", is(address2.getEmail())))
			.andExpect(jsonPath("$[1].phone", is(address2.getPhone())))
			.andExpect(jsonPath("$[1].address", is(address2.getAddress())))
			.andExpect(jsonPath("$[1].address2", is(address2.getAddress2())))
			.andExpect(jsonPath("$[1].city", is(address2.getCity())))
			.andExpect(jsonPath("$[1].state", is(address2.getState())))
			.andExpect(jsonPath("$[1].zipcode", is(address2.getZipcode())));
	}
	
	@Test
	public void testGetAllAddressesWhenNoneExist() throws Exception {
		//GIVEN there are no addresses stored yet
		given(this.addressBookRepository.findAll()).willReturn(new ArrayList());
		
		//WHEN calling our api to list all addresses
		MockHttpServletRequestBuilder builder = MockMvcRequestBuilders.get("/api/address");
		ResultActions action = this.mockMvc.perform(builder);
		
		//THEN an empty list is shown
		 action
		 	.andExpect(status().isOk())
		 	.andExpect(content().string("[]"));
	}
	
	@Test
	public void testCreateNewAddress() throws Exception {
		//GIVEN an address we want to save
		Address expectedAddress = new Address(2L, "Joe", "Shmo", "joe@shmo.com", "805-999-9999", "324 Channel Islands Blvd","apt 2","Cambria","CA", "93428");
		given(this.addressBookRepository.save(any(Address.class))).willReturn(expectedAddress);
		ObjectMapper jsonMapper = new ObjectMapper();
		
		//WHEN performing a POST request to our api with the correct body
		MockHttpServletRequestBuilder builder = MockMvcRequestBuilders.post("/api/address")
												.contentType(MediaType.APPLICATION_JSON)
												.content(jsonMapper.writeValueAsString(expectedAddress));
		ResultActions action = this.mockMvc.perform(builder);
		//THEN the repository should save the correct address and return it in the response
		action
			.andExpect(status().isOk())
			.andExpect(jsonPath("$.id", is(expectedAddress.getId().intValue())))
			.andExpect(jsonPath("$.firstName", is(expectedAddress.getFirstName())))
			.andExpect(jsonPath("$.lastName", is(expectedAddress.getLastName())))
			.andExpect(jsonPath("$.email", is(expectedAddress.getEmail())))
			.andExpect(jsonPath("$.phone", is(expectedAddress.getPhone())))
			.andExpect(jsonPath("$.address", is(expectedAddress.getAddress())))
			.andExpect(jsonPath("$.address2", is(expectedAddress.getAddress2())))
			.andExpect(jsonPath("$.city", is(expectedAddress.getCity())))
			.andExpect(jsonPath("$.state", is(expectedAddress.getState())))
			.andExpect(jsonPath("$.zipcode", is(expectedAddress.getZipcode())));
		
		then(addressBookRepository).should().save(argThat(new IsAddressThatMatches(expectedAddress)));
		
	}
	
	@Test
	public void testUpdatingAddress() throws Exception {
		//GIVEN an address to update
		ObjectMapper jsonMapper = new ObjectMapper();
		Address expectedAddress = new Address(1L, "Joe", "Shmo", "joe@shmo.com", "805-999-9999", "324 Channel Islands Blvd","apt 2","Cambria","CA", "93428");
		given(this.addressBookRepository.save(any(Address.class))).willReturn(expectedAddress);
		//WHEN calling the api with the updated address information
		MockHttpServletRequestBuilder builder = MockMvcRequestBuilders.put("/api/address/" + expectedAddress.getId())
				.contentType(MediaType.APPLICATION_JSON)
				.content(jsonMapper.writeValueAsString(expectedAddress));

		ResultActions action = this.mockMvc.perform(builder);
		
		//THEN the address should be saved to the repository and returned from the api
		action
			.andExpect(status().isOk())
			.andExpect(jsonPath("$.id", is(expectedAddress.getId().intValue())))
			.andExpect(jsonPath("$.firstName", is(expectedAddress.getFirstName())))
			.andExpect(jsonPath("$.lastName", is(expectedAddress.getLastName())))
			.andExpect(jsonPath("$.email", is(expectedAddress.getEmail())))
			.andExpect(jsonPath("$.phone", is(expectedAddress.getPhone())))
			.andExpect(jsonPath("$.address", is(expectedAddress.getAddress())))
			.andExpect(jsonPath("$.address2", is(expectedAddress.getAddress2())))
			.andExpect(jsonPath("$.city", is(expectedAddress.getCity())))
			.andExpect(jsonPath("$.state", is(expectedAddress.getState())))
			.andExpect(jsonPath("$.zipcode", is(expectedAddress.getZipcode())));
		
		then(addressBookRepository).should().save(argThat(new IsAddressThatMatches(expectedAddress)));
	}
	
	@Test
	public void testDeletingAddressById() throws Exception {
		//GIVEN An address ID we want to delete
		Long id = 1L;
		
		//WHEN calling the api with the addressID we want to delete
		ResultActions action = this.mockMvc.perform(delete("/api/address/{addressId}", id));
		
		//THEN the address should be deleted from the repository successfully
		action
			.andExpect(status().isOk())
			.andExpect(jsonPath("$.message", is("Address successfully deleted.")));
		
		then(addressBookRepository).should().delete(id);	
	}
	
	class IsAddressThatMatches extends ArgumentMatcher<Address> {
		Address expectedAddress;
		public IsAddressThatMatches(Address address) {
			this.expectedAddress = address;
		}
		public boolean matches(Object realAddress) {
			return ((Address) realAddress).equals(expectedAddress);
		}
	}
}
