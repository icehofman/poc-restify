# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
 
  config.vm.box = "williamyeh/ubuntu-trusty64-docker"

  config.vm.network "forwarded_port", guest: 8080, host: 8080
  
  config.vm.synced_folder ".", "/vagrant", disabled: false
  
  config.vm.provider "virtualbox" do |v|
    v.memory = 2048
    v.cpus = 2
  end
  
  config.vm.provision :docker

  #Install the plugin: vagrant plugin install vagrant-docker-compose
  #config.vm.provision :docker_compose, yml: "/vagrant/docker-compose.yml", rebuild: true, run: "always"  
   
end