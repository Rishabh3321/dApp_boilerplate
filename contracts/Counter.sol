// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21;

contract Counter{
    uint8 public counter = 0;

    function incrementByOne() public {
        counter++;
    }
}