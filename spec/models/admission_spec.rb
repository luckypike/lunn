require 'rails_helper'

describe Admission do
  describe 'associations' do
    it { should belong_to(:user) }
  end

  describe 'validation' do
    subject { build(:admission, :random_user) }

    context 'step two' do
      it { is_expected.to be_valid }
    end
  end
end
