package com.addressbook.controller;



import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.addressbook.Address;
import com.addressbook.dao.AddressBookRespository;

@RestController
@RequestMapping("/api")
public class AddressBookController {
	
	@Autowired
	AddressBookRespository addressBookRepository;
	
	@GetMapping("/address/{addressId}")
	public ResponseEntity<?> getAddressById(@PathVariable("addressId") int addressId) {
		Address address = (Address) addressBookRepository.findOne((long) addressId);
		if(address != null) {
			return ResponseEntity.ok().body(address);			
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping("/address")
	public Collection<Address> listAllAddresses() {
		return (List<Address>) addressBookRepository.findAll();
	}
	
	@PostMapping("/address")
	public ResponseEntity<Address> createAddress(@RequestBody Address newAddress) {
		return ResponseEntity.ok().body(addressBookRepository.save(newAddress));
	}
	
	@PutMapping("/address/{addressId}")
	public ResponseEntity<Address> updateAddress(@PathVariable("addressId") long addressId, @RequestBody Address updatedAddress) {
		return createAddress(updatedAddress);
	}
	
	@DeleteMapping("/address/{addressId}")
	public String deleteAddress(@PathVariable("addressId") long addressId) {
		addressBookRepository.delete(addressId);
		return "{ \"message\":\"Address successfully deleted.\"\n }";
	}
}
