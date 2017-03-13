class LayingHen
  attr_reader :age
  attr_reader :eggs

  def initialize(age = 0, eggs = 0)
    @age = age
    @eggs = eggs
  end

  # Ages the hen one month, and lays 4 eggs if the hen is older than 3 months
  def age!
    @eggs += 4 if @age > 3
    @age += 1
  end

  # Returns +true+ if the hen has laid any eggs, +false+ otherwise
  def any_eggs?
    if @eggs > 0 then true else false end
  end

  # Returns an Egg if there are any
  # Raises a NoEggsError otherwise
  def pick_an_egg!
    raise NoEggsError, "The hen has not layed any eggs" unless self.any_eggs?

    # egg-picking logic goes here
  end


end

class Egg

end
