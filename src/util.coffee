
PRINTF = ///    # Printf style format parser
  (\%)          # pct - % escape
  ([-])?        # flag left justify
  ([+ ])?       # flag sign
  ([0])?        # flag padding
  (\d*)?        # field width
  (\.\d*)?      # decimal precision
  ([\%ds])      # output specifier
  ///g


module.exports = util =
  #
  # Clean up the raw source code
  #
  # @param  [String]  code  the raw source code
  # @return [Array<String>]
  #
  clean: ($code) ->

    $code = $code[1..] if $code.charCodeAt(0) is 0xfeff # Skip BOM
    $code = ($code + '\n')    # make sure there is an ending LF
    .replace(/\r/g,  '\n')    # replace CR's with LF's
    .replace(/\n+/g, '\n')    # remove duplicate LF's


  #
  # flatten a nested list
  #
  # @param  [Array] list  nested list
  # @return [Array] the flattened list
  #
  flatten: ($list) ->

    return [] unless $list?

    $a = []
    for $item in $list
      if Array.isArray($item)
        $a = $a.concat util.flatten($item)
      else
        $a.push $item
    return $a

  #
  # printf style output
  #
  # @param  [String] fmt  printf style format string
  # @param  [Array] list  list of args
  # @return [String] the formatted output
  #
  sprintf: ($fmt, $list) ->

    $count = 0
    #
    # format each print spec/value pair
    #
    foreach = ($match, $pct, $just, $sign, $pad=' ', $width, $prec, $spec, $ofset, $string) ->

      $value = String($list[$count++])
      switch $spec
      #
      # %% = Escaped %
      #
        when '%'
          '%'
      #
      # String format
      #
        when 's'
          if $width?
            $width = parseInt($width, 10)
            if $value.length < $width
              if $just? # left
                return Array($width-$value.length+1).join($pad) + $value
              else      # right
                return $value + Array($width-$value.length+1).join($pad)
          $value
      #
      # Number format
      #
        when 'd'
          if $width?
            $width = parseInt($width, 10)
            if $value.length < $width
              if $just? # left
                return $value + Array($width-$value.length+1).join($pad)
              else      # right
                return Array($width-$value.length+1).join($pad) + $value
          $value


    $fmt.replace(PRINTF, foreach)

  #
  # Pad string to length
  #
  # @param  [String] value
  # @param  [Integer] len
  # @param  [String] pad char
  # @return [String] the padded string
  #
  pad: ($value, $len, $pad = ' ') ->

    $right = not isNaN($value)  # right justify numerics
    $value = String($value)     # ensure that we work with a string
    if $right
      if $value.length < $len
        Array($len-$value.length+1, $pad) + $value
      else
        $value.substr(0, $len)

    else
      if $value.length < $len
        $value + Array($len-$value.length+1, $pad)
      else
        $value.substr(0, $len)


