package com.addressbook;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Address {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private String firstName;
	private String lastName;
	private String email;
	private String phone;
	private String address;
	private String address2;
	private String city;
	private String state;
	private String zipcode;
	
//	public boolean equals(Address address) {
//		return this.firstName.equals(address.getFirstName()) && this.lastName.equals(address.getLastName()) && this.email.equals(address.getEmail()) &&
//				this.phone.equals(address.getPhone()) && this.address.equals(address.getAddress()) && this.address2.equals(address.getAddress2()) &&
//				this.city.equals(address.getCity()) && this.state.equals(address.getState()) && this.zipcode.equals(this.getZipcode());
//	}
}
