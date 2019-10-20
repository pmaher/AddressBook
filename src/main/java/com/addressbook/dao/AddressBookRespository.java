package com.addressbook.dao;

import org.springframework.data.repository.CrudRepository;

import com.addressbook.Address;

public interface AddressBookRespository extends CrudRepository<Address, Long> {

}
