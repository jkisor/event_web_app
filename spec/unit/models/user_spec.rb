require 'spec_helper'

describe User do
	before do 
		@user = User.new(name:"example", 
                     password: "1234", 
                     password_confirmation: "1234",
                     email: "example@example.com")
	end
	
	subject { @user }
	
  [ :name, 
    :email, 
    :password, 
    :password_confirmation, 
    :password_hash, 
    :password_salt, 
    :events,
    :admin
  ].each do |message|
    it { should respond_to message }
  end

	describe "when name is not present" do
		before { @user.name = " " }
    	it { should_not be_valid }
	end

	context "when saving" do
  		before { @user.save }
  		it "creates a remember token" do
  			expect(@user.remember_token).not_to be_nil
  		end
  	end
  
  describe "when password is not present" do
    before { @user.password = " " }
      it { should_not be_valid }
  end

  describe "when password confirmation is not present" do
    before { @user.password_confirmation = " " }
      it { should_not be_valid }
  end

  context "when password does not match" do
    before { @user.password_confirmation = "mismatch" }
    it { should_not be_valid }
  end

  context "when email format is invalid" do
      it "should be invalid" do
        addresses = %w[user@foo,com user_at_foo.org example.user@foo.
                       foo@bar_baz.com foo@bar+baz.com]
        addresses.each do |invalid_address|
          @user.email = invalid_address
          expect(@user).not_to be_valid
        end
      end
  end

  context "when email format is valid" do
      it "should be valid" do
        addresses = %w[user@foo.COM A_US-ER@f.b.org frst.lst@foo.jp a+b@baz.cn]
        addresses.each do |valid_address|
          @user.email = valid_address
          expect(@user).to be_valid
        end
      end
  end

  context "when email address is already taken" do
      before do
        user_with_same_email = @user.dup
        user_with_same_email.save
      end
      it { should_not be_valid }
    end

  context "when name is already taken" do
    before do
      user_with_same_name = @user.dup
      user_with_same_name.save
      @user.email = "somethingdifferent@apple.com"
    end
    it { should_not be_valid }
  end

  describe "email address with mixed case" do
    let(:mixed_case_email) { "Cat@INtheHat.CoM" }
    it "is saved as lowercase" do
      @user.email = mixed_case_email
      @user.save
      expect(@user.reload.email).to eq mixed_case_email.downcase
    end
  end

  describe "#authenticate" do
  	before { @user.save }
  	let(:found_user) { User.find_by(name: @user.name) }

  	context "when password is incorrect" do
  		it "returns nil" do
  			expect(User.authenticate(found_user.name, "incorrect")).to be_nil
  		end
  	end

  	context "when password is correct" do
  		it "returns the user" do
  			expect(User.authenticate(found_user.name, @user.password)).to eq(@user)
  		end
  	end
  end

  describe "when flagged as admin" do
    before do
      @user.save!
      @user.toggle!(:admin)
    end

    it { should be_admin }
  end
end